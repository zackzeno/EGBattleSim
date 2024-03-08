import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `
Can become an avatar for any character that is not chosen for the game and get that character's special moves and abilities. 
The character that My Jet is an avatar for will be chosen after all other characters are chosen regardless of when My Jet is chosen. 
My Jet's HP is 2 lower than the character they choose to be an avatar for. 
The other team is not told which character is chosen unless an ability is used to uncover it.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'MyJet',
    name: 'My Jet',
    baseHP: 0,
    currentHP: 0,
    attackDice: 8,
    attackBonus: 0,
    color: 'blue',
    image: '/card-images/myjet.jpg',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'avatar',
            name: 'Avatar',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: []
}

export default class MyJet extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}