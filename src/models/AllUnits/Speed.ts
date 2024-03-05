import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
SPEED always goes into the 3rd spot on a team but always has the first action each round.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'Speed',
    name: 'SPEED',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/speed.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'speed',
            name: 'SPEED',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: []
}

export default class Speed extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}