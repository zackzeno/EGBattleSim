import Unit from "@/models/Unit/Unit";
import Game, {SlotID, TeamID} from "@/models/Game/Game";


export default class Team {

    private _gameInfo?: {
        game: Game,
        teamID: TeamID,
        otherTeam: Team
    }
    private get gameInfo() {
        if(!this._gameInfo) {
            throw new Error('Team not assigned to game');
        }
        return this._gameInfo;
    }
    public get game(): Game { return this.gameInfo.game }
    public get teamID(): TeamID { return this.gameInfo.teamID }
    public get otherTeam(): Team { return this.gameInfo.otherTeam }

    constructor(
        public readonly name: string,
        public readonly units: [Unit, Unit, Unit]
    ) {
        for(let [slot, unit] of units.entries()) {
            unit.assignToTeam(this, slot as SlotID);
        }
    }

    public assignToGame(game: Game, teamID: TeamID, otherTeam: Team) {
        this._gameInfo = {
            game,
            teamID,
            otherTeam
        }
    }

    public isGameOver() {
        for(let unit of this.units) {
            if(unit.currentHP > 0) {
                return false;
            }
        }
        return true;
    }
}