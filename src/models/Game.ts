import Unit from "@/models/Unit";
import Team from "@/models/Team";


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

export default class Game {

    private _currentTurn: number = 0;
    private _unitOrder: Unit[];

    get currentTurn() { return this._currentTurn }
    get currentUnit() { return this._unitOrder[this.currentTurn % 6] }
    get currentRound() { return Math.floor(this._currentTurn / 6) }
    get currentTeam() { return this.currentUnit.team! }
    get currentTeamID() { return this.currentTeam.teamID! }
    get currentSlotID() { return this.currentUnit.slotID! }

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