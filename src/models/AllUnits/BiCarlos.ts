import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
Once per game, can lure on enemy. The enemy spends 1 turn trying to find Bi Carlos and cannot act that turn.
There is also a 50% chance that Bi Carlos traps that character in his webs and immobilizes them for a second turn.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    name: 'Bi Carlos',
    baseHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/bicarlos.jpg',
    imageCredit: 'Bi Carlos art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'intriguing_lure',
            name: 'Intriguing Lure',
            description: MOVE_DESCRIPTION
        }
    ]
}

export default class BiCarlos extends Unit {

    constructor() {
        super(UNIT_DETAILS);
    }
}