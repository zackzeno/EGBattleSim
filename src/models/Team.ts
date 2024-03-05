import Unit from "@/models/Unit";
import Game, {SlotID, TeamID} from "@/models/Game";


export default class Team {

    public game?: Game;
    public teamID?: TeamID;
    constructor(
        public readonly name: string,
        public readonly units: [Unit, Unit, Unit]
    ) {
        for(let [slot, unit] of units.entries()) {
            unit.team = this;
            unit.slotID = slot as SlotID
        }
    }
}