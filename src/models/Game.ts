import Unit, {IUnitDetails} from "@/models/Unit";
import Team from "@/models/Team";
import {ALL_UNIT_MAP} from "@/models/AllUnits";


export type TeamID = 0|1;
export type SlotID = 0|1|2

export interface Action {
    type: 'normal'|'special'
    index: number;
    target: SlotID
}

interface DamageEffect {
    type: 'damage',
    amount: number,
    targetTeam: TeamID,
    targetSlot: SlotID
}
interface HealEffect {
    type: 'heal',
    amount: number,
    allowAboveBase: boolean
}
interface SpecialEffect {
    type: 'special',
    code: string

    isNegative?: boolean,
    metadata?: object
}
export type TurnEffect = DamageEffect | HealEffect | SpecialEffect;

interface GetActionParameters {
    currentTeam: Team
    currentUnit: Unit
    otherTeam: Team
}

export interface IGameState {
    currentTurn: number,
    unitOrder: string[]
    teams: [
        {name: string, units: [IUnitDetails, IUnitDetails, IUnitDetails]},
        {name: string, units: [IUnitDetails, IUnitDetails, IUnitDetails]}
    ]
}

interface StateChangeCallback {
    (gameState: IGameState): void
}

export default class Game {

    private _currentTurn: number = 0;
    private _unitOrder: Unit[];
    private _stateChangeCallbacks: Set<StateChangeCallback> = new Set();

    get currentTurn() { return this._currentTurn }
    get currentUnit() { return this._unitOrder[this.currentTurn % 6] }
    get currentRound() { return Math.floor(this._currentTurn / 6) }
    get currentTeam() { return this.currentUnit.team! }
    get currentTeamID() { return this.currentTeam.teamID! }
    get currentSlotID() { return this.currentUnit.slotID! }

    get gameState(): IGameState {
        return {
            currentTurn: this.currentTurn,
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
        for(let [i, team] of teams.entries()) {
            team.game = this;
            team.teamID = i as TeamID;
        }

        this._unitOrder = [
            teams[0].units[0],
            teams[1].units[0],
            teams[0].units[1],
            teams[1].units[1],
            teams[0].units[2],
            teams[1].units[2],
        ]
    }

    public static fromGameState(gameState: IGameState): Game {
        let game = new Game([
            new Team(
                gameState.teams[0].name,
                gameState.teams[0].units.map(unit => new ALL_UNIT_MAP[unit.id]()) as [Unit, Unit, Unit]
            ),
            new Team(
                gameState.teams[1].name,
                gameState.teams[1].units.map(unit => new ALL_UNIT_MAP[unit.id]()) as [Unit, Unit, Unit]
            )
        ]);

        game._currentTurn = gameState.currentTurn;
        game._unitOrder = gameState.unitOrder.map(id => game._unitOrder.find(unit => unit.id == id)!);

        return game;
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

    public async startGame() {
        for(let [i, unit] of this._unitOrder.entries()) {
            if(unit.onStartGame) {
                await unit.onStartGame(this, i % 2 as TeamID);
            }
        }

        await this.runTurn();
    }

    public async runTurn() {

        let currentTeam = this.currentTeam;
        let currentUnit = this.currentUnit;

        let otherTeam = this.teams[this.currentTeamID + 1 % 2];

        let action: Action = await this.getAction({currentTeam, currentUnit, otherTeam})

    }

    public async getAction({currentTeam, currentUnit, otherTeam}: GetActionParameters): Promise<Action> {

        let target = otherTeam.units.find(unit => unit.currentHP > 0);

        return {
            type: 'normal',
            index: 0,
            target: target?.slotID!
        }
    }

    public async rollDice(dice: number, bonus: number): Promise<number> {

        return Math.floor(Math.random() * dice) + 1 + bonus

    }

    public isGameOver(): boolean {
        for(let unit of this._unitOrder) {
            if(unit.currentHP > 0) {
                return false;
            }
        }

        return true;
    }
}