
import Game, {Action, SlotID, TeamID} from "@/models/Game/Game";
import Team from "@/models/Game/Team";
import Passive from "@/models/Game/Passive";
import {AnyEffect} from "@/models/Game/Effect";

export type UnitColor = 'white'|'blue'|'green'|'red';

export interface ISpecialAbility {
    readonly id: string
    readonly name: string
    readonly description: string
}

export interface ISpecialMove extends ISpecialAbility {
    readonly targetType: 'enemy'|'ally'|'any'|'none'
}

export interface IUnitDetails {
    readonly id: string;
    readonly name: string
    readonly baseHP: number
    readonly currentHP: number;
    readonly attackDice: number
    readonly attackBonus: number
    readonly color: UnitColor
    readonly image: string
    readonly imageCredit: string
    readonly specialMoves: readonly ISpecialMove[]
    readonly specialAbilities: readonly ISpecialAbility[]
}

interface Unit {
    onStartGame?(game: Game): Promise<AnyEffect[]>
    onStartRound?(game: Game): Promise<AnyEffect[]>
    onStartTurn?(game: Game): Promise<AnyEffect[]>

    doSpecialMove?(game: Game, index: number, targetUnit: Unit): Promise<AnyEffect[]>
}
class Unit implements IUnitDetails {
    readonly id: string;
    readonly name: string;
    readonly baseHP: number;
    readonly attackDice: number;
    readonly attackBonus: number;
    readonly color: UnitColor;
    readonly image: string;
    readonly imageCredit: string;
    readonly specialMoves: readonly ISpecialMove[];
    readonly specialAbilities: readonly ISpecialAbility[];

    private _teamInfo?: {
        team: Team,
        slotID: SlotID
    };
    private get teamInfo() {
        if(!this._teamInfo) {
            throw new Error('Unit not assigned to game');
        }
        return this._teamInfo;
    }
    public get team(): Team { return this.teamInfo.team }
    public get slotID(): SlotID { return this.teamInfo.slotID }

    protected _currentHP: number;
    public get currentHP() {return this._currentHP}

    protected _passives: Passive[];
    public get passives() { return this._passives }

    public get unitState(): IUnitDetails {

        const {
            id,
            name,
            baseHP,
            currentHP,
            attackDice,
            attackBonus,
            color,
            image,
            imageCredit,
            specialMoves,
            specialAbilities
        } = this;

        return {
            id,
            name,
            baseHP,
            currentHP,
            attackDice,
            attackBonus,
            color,
            image,
            imageCredit,
            specialMoves: specialMoves.map(move => ({...move})),
            specialAbilities: specialAbilities.map(ability => ({...ability}))
        }
    }

    public constructor(details: IUnitDetails) {
        this.id = details.id;
        this.name = details.name;
        this.baseHP = details.baseHP;
        this._currentHP = details.currentHP;
        this.attackDice = details.attackDice;
        this.attackBonus = details.attackBonus;
        this.color = details.color;
        this.image = details.image;
        this.imageCredit = details.imageCredit;
        this.specialMoves = details.specialMoves;
        this.specialAbilities = details.specialAbilities;

        this._passives = [];
    }

    public assignToTeam(team: Team, slot: SlotID) {
        this._teamInfo = {
            team,
            slotID: slot
        }
    }

    public dealDamage(damage: number) {
        console.log('Damaging', this, 'by', damage)
        this._currentHP -= damage;
        if(this._currentHP < 0) {
            this._currentHP = 0;
        }
    }

    public healDamage(damage: number, allowAboveBase: boolean) {
        console.log('Healing', this, 'by', damage, allowAboveBase)
        this._currentHP += damage;
        if(!allowAboveBase && this._currentHP > this.baseHP) {
            this._currentHP = this.baseHP;
        }
    }

    public setHealth(newHealth: number) {
        console.log('Setting', this, 'health to', newHealth)
        this._currentHP = newHealth;
    }

    addPassive(passive: Passive) {
        console.log('Adding', passive, 'to', this)
        this._passives = [
            ...this._passives,
            passive
        ];
    }
    removePassive(passive: Passive) {
        console.log('Removing', passive, 'from', this)
        this._passives = this._passives.filter(p => p === passive);
    }

    public async doNormalMove(game: Game, target: Unit): Promise<AnyEffect[]> {
        let roll = await game.rollDice({
            initiator: this,
            target,
            type: 'normal',
            dice: this.attackDice,
            bonus: this.attackBonus,
            reason: 'Normal Move'
        });

        console.log('Doing normal roll', this, target, roll);

        return [
            {
                type: 'damage',
                initiator: this,
                target,
                amount: roll.result
            }
        ]
    }

    public async doTurn(game: Game, action: Action): Promise<AnyEffect[]> {

        switch (action.type) {
        case 'normal':
            return this.doNormalMove(
                game,
                action.target
            )
        case 'special':
            if(!this.doSpecialMove) {
                throw new Error(`${this.name} does not have special moves`);
            }

            return this.doSpecialMove(
                game,
                action.index,
                action.target
            )
        }
    }
}

namespace Unit {
    const ALL_UNITS_MAP: Map<string, {new(): Unit}> = new Map();

    export function registerUnit(NewUnit: {id: string, new(): Unit}) {
        ALL_UNITS_MAP.set(NewUnit.id, NewUnit);
    }

    export function makeUnitInstance(unitId: string) {
        const NewUnit = ALL_UNITS_MAP.get(unitId)!

        return new NewUnit();
    }

    export function getAllUnitIds(): string[] {
        return [...ALL_UNITS_MAP.keys()]
    }
}

export default Unit;