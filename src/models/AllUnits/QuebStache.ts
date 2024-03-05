import Unit, {IUnitDetails} from "@/models/Unit";
import Game, {Team} from "@/models/Game";

const MOVE_DESCRIPTION_1 = `
Gives +5 HP to teammates. Effect continues if Queb Stache dies.
`.trim()

const MOVE_DESCRIPTION_2 = `
1. Can add 2 to any teammate’s special roll for one turn.
2. Can add 3 to any teammate’s normal attack roll for one turn.
`.trim()


export const UNIT_DETAILS: IUnitDetails = {
    name: 'Queb Stache',
    baseHP: 10,
    attackDice: 4,
    attackBonus: 0,
    color: 'green',
    image: '/card-images/quebstache.png',
    imageCredit: 'Queb Stache art generated with AI',
    specialAbilities: [
        {
            id: 'inspirational_stache',
            name: 'Inspirational Stache',
            description: MOVE_DESCRIPTION_1
        }
    ],
    specialMoves: [
        {
            id: 'fake_mustache',
            name: 'Fake Stache',
            description: MOVE_DESCRIPTION_2
        }
    ]
}
export default class QuebStache extends Unit {
    constructor() {
        super(UNIT_DETAILS);
    }

    public async onStartGame(game: Game, myTeam: 0|1) {

        for(let unit of game.teams[myTeam].units) {
            unit.healDamage(5, true);
        }
    }
}