import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `
Can choose to attack 1, 2 or 3 enemies each round. 
A d8 is rolled for each enemy, and that number is divided by the number of enemies attacked to determine damage to that enemy. 
These count as normal rolls for any special abilities.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'TheSixthGraders',
    name: 'The 6th Graders',
    baseHP: 20,
    currentHP: 20,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/the6thgraders.jpg',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'mob',
            name: 'Mob',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: []
}

export default class TheSixthGraders extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}