import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
The first enemy that kills The Great Moth Detective’s teammate will be caught and locked up for 2 turns, unable to perform any actions.
`.trim()
const MOVE_DESCRIPTION_2 = `
1. Can investigate Goodapple/Tomontos or My Jet to see which character they are.
2. Can investigate any enemy action or condition that would not otherwise be revealed to the team.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'TheGreatMothDetective',
    name: 'The Great Moth Detective',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/thegreatmothdetective.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'homicide_detective',
            name: 'Homicide Detective',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: [
        {
            id: 'private_investigation',
            name: 'Private Investigation',
            description: MOVE_DESCRIPTION_2
        }
    ]
}

export default class TheGreatMothDetective extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}