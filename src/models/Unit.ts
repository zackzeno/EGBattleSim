import ISpecialMove from "@/models/SpecialMove";
import ISpecialAbility from "@/models/SpecialAbility";
import Game, {SlotID, TeamID, TurnEffect} from "@/models/Game";
import Team from "@/models/Team";

export type UnitColor = 'white'|'blue'|'green'|'red';
export interface IUnitDetails {
    readonly name: string
    readonly baseHP: number
    readonly attackDice: number
    readonly attackBonus: number
    readonly color: UnitColor
    readonly image: string
    readonly imageCredit: string
    readonly specialMoves: readonly ISpecialMove[]
    readonly specialAbilities: readonly ISpecialAbility[]

    readonly currentHP?: number;
}

interface Unit {
    onStartGame?(game: Game, myTeam: 0|1): Promise<void>
    onStartRound?(game: Game, myTeam: 0|1): Promise<void>

    doSpecialMove?(game: Game, index: number, targetTeam: TeamID, targetSlot: SlotID): Promise<TurnEffect[]>

    onEffect?(game: Game, effect: TurnEffect): Promise<TurnEffect>
}
abstract class Unit implements IUnitDetails {

    readonly name: string;
    readonly baseHP: number;
    readonly attackDice: number;
    readonly attackBonus: number;
    readonly color: UnitColor;
    readonly image: string;
    readonly imageCredit: string;
    readonly specialMoves: readonly ISpecialMove[];
    readonly specialAbilities: readonly ISpecialAbility[];

    public team?: Team;
    public slotID?: SlotID;

    protected _currentHP: number;
    public get currentHP() {return this._currentHP}

    protected constructor(details: IUnitDetails) {
        this.name = details.name;
        this.baseHP = details.baseHP;
        this.attackDice = details.attackDice;
        this.attackBonus = details.attackBonus;
        this.color = details.color;
        this.image = details.image;
        this.imageCredit = details.imageCredit;
        this.specialMoves = details.specialMoves;
        this.specialAbilities = details.specialAbilities;

        this._currentHP = this.baseHP;
    }

    public dealDamage(damage: number) {
        this._currentHP -= damage;
        if(this._currentHP < 0) {
            this._currentHP = 0;
        }
    }

    public healDamage(damage: number, allowAboveBase: boolean) {
        this._currentHP += damage;
        if(!allowAboveBase && this._currentHP > this.baseHP) {
            this._currentHP = this.baseHP;
        }
    }

    public async doNormalMove(game: Game, targetTeam: TeamID, targetSlot: SlotID): Promise<TurnEffect[]> {
        let roll = await game.rollDice(this.attackDice, this.attackBonus);

        return [
            {
                type: 'damage',
                amount: roll,
                targetTeam,
                targetSlot
            }
        ]
    }

    public async doTurn(game: Game, myTeam: TeamID, mySlot: SlotID): Promise<TurnEffect[]> {

        let action = await game.getAction({
            currentTeam: game.teams[myTeam],
            currentUnit: game.teams[myTeam].units[mySlot],
            otherTeam: game.teams[myTeam + 1 % 2]
        });

        switch (action.type) {
        case 'normal':
            return this.doNormalMove(
                game,
                myTeam + 1 % 2 as TeamID,
                action.target
            )
        case 'special':
            if(!this.doSpecialMove) {
                throw new Error(`${this.name} does not have special moves`);
            }

            return this.doSpecialMove(
                game,
                action.index,
                myTeam + 1 % 2 as TeamID,
                action.target
            )
        }
    }
}

export default Unit;