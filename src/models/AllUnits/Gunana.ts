import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
Has a shotgun that it can use once per game. The shotgun does d6 damage to the targeted character and does half that much damage to any adjacent characters.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'Gunana',
    name: 'Gunana',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 2,
    color: 'red',
    image: '/card-images/gunana.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'shotgun',
            name: 'Shotgun',
            description: MOVE_DESCRIPTION
        }
    ]
}

export default class Gunana extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}