import Unit, {IUnitDetails} from "@/models/Unit/Unit";
import Team from "@/models/Game/Team";
import {DieRoll, DieRollWithResult} from "@/models/Game/DieRoll";
import {AnyEffect, DamageEffect, HealEffect, NullEffect, SpecialEffect} from "@/models/Game/Effect";
import _ from "lodash";


export type TeamID = 0|1;
export type SlotID = 0|1|2

export interface Action {
    type: 'normal'|'special'
    index: number;
    target: Unit
}

export interface IGameState {
    started: boolean,
    currentTurn: number
    currentUnit: string
    unitOrder: string[]
    teams: [
        {name: string, units: [IUnitDetails, IUnitDetails, IUnitDetails]},
        {name: string, units: [IUnitDetails, IUnitDetails, IUnitDetails]}
    ]
}

interface StateChangeCallback {
    (gameState: IGameState): void
}
interface LogChangeCallback {
    (log: string[]): void
}

export default class Game {

    private _gameStarted: boolean = false;
    private _gameOver: boolean = false;
    private _currentTurn: number = 0;
    private _unitOrder: Unit[];
    private _log: string[] = []
    private _stateChangeCallbacks: Set<StateChangeCallback> = new Set();
    private _logChangeCallbacks: Set<LogChangeCallback> = new Set();

    get currentTurn() { return this._currentTurn }
    get currentUnit() { return this._unitOrder[this.currentTurn % 6] }
    get currentRound() { return Math.floor(this._currentTurn / 6) }
    get currentTeam() { return this.currentUnit.team }
    get currentTeamID() { return this.currentTeam.teamID }
    get currentSlotID() { return this.currentUnit.slotID }

    get gameState(): IGameState {
        return {
            started: this._gameStarted,
            currentTurn: this.currentTurn,
            currentUnit: this.currentUnit.id,
            unitOrder: this._unitOrder.map(u => u.id),
            teams: [
                {
                    name: this.teams[0].name,
                    units: [
                        this.teams[0].units[0].unitState,
                        this.teams[0].units[1].unitState,
                        this.teams[0].units[2].unitState,
                    ]
                },
                {
                    name: this.teams[1].name,
                    units: [
                        this.teams[1].units[0].unitState,
                        this.teams[1].units[1].unitState,
                        this.teams[1].units[2].unitState,
                    ]
                },
            ]
        }
    }

    constructor(
        public readonly teams: readonly [Team, Team]
    ) {

        teams[0].assignToGame(this, 0, teams[1]);
        teams[1].assignToGame(this, 1, teams[0]);

        this._unitOrder = [
            teams[0].units[0],
            teams[1].units[0],
            teams[0].units[1],
            teams[1].units[1],
            teams[0].units[2],
            teams[1].units[2],
        ]
    }

    public addStateChangeCallback(callback: StateChangeCallback) {
        this._stateChangeCallbacks.add(callback)
        callback(this.gameState);
    }
    public removeStateChangeCallback(callback: StateChangeCallback) {
        this._stateChangeCallbacks.delete(callback)
    }
    public incrementTurn() {
        this._currentTurn++;
        this._stateChangeCallbacks.forEach(callback => callback(this.gameState));
    }
    public addLogChangeCallback(callback: LogChangeCallback) {
        this._logChangeCallbacks.add(callback)
        callback(this._log);
    }
    public removeLogChangeCallback(callback: LogChangeCallback) {
        this._logChangeCallbacks.delete(callback)
    }
    public log(...value: any[]) {
        console.log(...value)
        this._log = [...this._log, value.join(' ')];
        this._logChangeCallbacks.forEach(callback => callback(this._log))
    }

    public async startGame() {
        this.log('Game Started');

        for(let [i, unit] of this._unitOrder.entries()) {
            if(unit.onStartGame) {
                let effects = await unit.onStartGame(this);
                await this._handleRootEffects(effects);
            }
        }

        this._gameStarted = true;
        this._stateChangeCallbacks.forEach(callback => callback(this.gameState));
    }

    public async runTurn() {

        if(!this._gameStarted || this._gameOver) {
            return;
        }

        this.log('-------------');
        this.log('Starting turn', this.currentTurn + 1)

        // Clear expired passives
        for(let unit of this._unitOrder) {
            for(let passive of unit.passives) {
                if(passive.expiration && passive.expiration <= this.currentTurn) {
                    unit.removePassive(passive);
                    this.log(unit.name, 'is no longer affected by', passive.name, '(expiration)')
                }
            }
        }

        //Maybe start of round
        if(this.currentTurn % 6 == 0) {
            for(let unit of this._unitOrder) {
                for(let passive of unit.passives) {
                    if(passive.onRoundStart) {
                        await passive.onRoundStart(this, unit)
                    }
                }
            }
        }


        // Check if dead then end turn
        if(this.currentUnit.currentHP == 0) {
            this.log(this.currentUnit.name, 'is dead so they can\'t move');
        }
        else {
            // Start of turn

            // Evaluate Passives
            let passiveEffects: AnyEffect[] = [];
            for(let passive of this.currentUnit.passives) {
                if(passive.onTurnStart) {
                    passiveEffects = [
                        ...passiveEffects,
                        ...await passive.onTurnStart(this, this.currentUnit)
                    ]
                }
            }
            await this._handleRootEffects(passiveEffects);

            let action: Action = await this.getAction()

            this.log(this.currentUnit.name, 'will do', action.type, 'action against', action.target.name);

            // Evaluate active effects
            let effects = await this.currentUnit.doTurn(this, action);
            await this._handleRootEffects(effects);


            // Evaluate Passives
            for(let passive of this.currentUnit.passives) {
                if(passive.onTurnEnd) {
                    await passive.onTurnEnd(this, this.currentUnit)
                }
            }
        }

        //Maybe end of round
        if(this.currentTurn % 6 == 5) {
            for(let unit of this._unitOrder) {
                for(let passive of unit.passives) {
                    if(passive.onRoundEnd) {
                        await passive.onRoundEnd(this, unit)
                    }
                }
            }
        }

        if(this.teams[0].isGameOver()) {
            this._gameOver = true;
            this.log(this.teams[1].name, 'WINS')
        }
        else if(this.teams[1].isGameOver()) {
            this._gameOver = true;
            this.log(this.teams[0].name, 'WINS')
        }

        this.incrementTurn()
    }

    private async _handleRootEffects(effects: AnyEffect[]) {
        for(let effect of effects) {
            let [transformedEffect, ...newEffects] = await this._resolvePassives(effect);
            await this._processEffect(transformedEffect);
            console.log('Would process', newEffects);
        }
    }

    private async _resolvePassives(originalEffect: AnyEffect): Promise<AnyEffect[]> {
        if(!originalEffect.target) {
            return [originalEffect];
        }

        let newEffects: AnyEffect[] = [];
        switch (originalEffect.type) {
        case 'damage': {
            let currentEffect: NullEffect | DamageEffect = originalEffect;
            for(let passive of currentEffect.target.passives) {
                if(currentEffect.type != 'null' && passive.onDamageTarget) {
                    let [newEffect, addedEffects] = await passive.onDamageTarget(
                        this,
                        currentEffect.target,
                        currentEffect
                    );

                    currentEffect = newEffect;
                    newEffects = [...newEffects, ...addedEffects];
                }
            }
            return [currentEffect, ...newEffects];
        }
        case 'heal': {
            let currentEffect: NullEffect | HealEffect = originalEffect;
            for(let passive of currentEffect.target.passives) {
                if(currentEffect.type != 'null' && passive.onHealTarget) {
                    let [newEffect, addedEffects] = await passive.onHealTarget(
                        this,
                        currentEffect.target,
                        currentEffect
                    );

                    currentEffect = newEffect;
                    newEffects = [...newEffects, ...addedEffects];
                }
            }
            return [currentEffect, ...newEffects];
        }
        default:
            return [originalEffect]
        }
    }

    private async _processEffect(effect: AnyEffect): Promise<void> {

        switch (effect.type) {
        case "null":
            break;
        case "damage":
            effect.target.dealDamage(effect.amount)
            this.log(effect.initiator.name, 'damaged', effect.target.name, 'by', effect.amount, `(now ${effect.target.currentHP})`)
            break;
        case "heal":
            effect.target.healDamage(effect.amount, effect.allowAboveBase)
            this.log(effect.initiator.name, 'healed', effect.target.name, 'by', effect.amount, `(now ${effect.target.currentHP})`)
            break;
        case "add-passive":
            this.log(effect.initiator.name, 'affected', effect.target.name, 'with', effect.passive.name)
            effect.target.addPassive(effect.passive);
            break;
        case "remove-passive":
            this.log(effect.target.name, 'is no longer affected by', effect.passive.name)
            effect.target.removePassive(effect.passive);
            break;
        case "special":
            await this._handleSpecial(effect);
            break;
        }
    }

    private async _handleSpecial(effect: SpecialEffect) {
        switch(effect.code) {
        case "skip_turn":
            break;

        case "move_to_front":
            this._unitOrder = [
                effect.initiator,
                ...this._unitOrder.filter(u => u != effect.initiator)
            ];
            break;
        }
    }

    public async getAction(): Promise<Action> {

        let aliveEnemies = this.currentTeam.otherTeam.units.filter(unit => unit.currentHP > 0);
        let aliveTeammates = this.currentTeam.units.filter(unit => unit.currentHP > 0 && unit !== this.currentUnit);

        let type = _.sample(['normal', 'special']);

        if(!this.currentUnit.specialMoves.length || type == 'normal') {
            return {
                type: 'normal',
                index: 0,
                target: _.sample(aliveEnemies)!
            }
        }

        let index = _.random(this.currentUnit.specialMoves.length - 1);
        let move = this.currentUnit.specialMoves[index];

        return {
            type: 'special',
            index,
            target: move.targetType == 'enemy' ? _.sample(aliveEnemies)! : _.sample(aliveTeammates)!
        }
    }

    public async rollDice(dieRoll: DieRoll): Promise<DieRollWithResult> {

        let passives = [
            ...dieRoll.initiator.passives,
            ...(dieRoll.target ?
                    dieRoll.target.passives :
                    []
            )
        ]

        for(let passive of passives) {
            if(passive.onBeforeRollDie) {
                dieRoll = await passive.onBeforeRollDie(this, dieRoll.initiator, dieRoll);
            }
        }

        let result = Math.floor(Math.random() * dieRoll.dice) + 1

        let descriptor = `${result}(d${dieRoll.dice}) + ${dieRoll.bonus} = ${result + dieRoll.bonus}`

        this.log(dieRoll.initiator.name, 'rolled a', descriptor, 'for', dieRoll.reason, 'against', dieRoll.target?.name)

        return {
            ...dieRoll,
            result: result + dieRoll.bonus
        }
    }
}