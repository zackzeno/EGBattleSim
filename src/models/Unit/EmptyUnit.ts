import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `

`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'EmptyUnit',
    name: '',
    baseHP: 0,
    currentHP: 0,
    attackDice: 0,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: '',
            name: '',
            description: MOVE_DESCRIPTION,
            targetType: 'none'
        }
    ]
}

export default class EmptyUnit extends Unit {
    public static readonly id = UNIT_DETAILS.id;
    constructor() {
        super(UNIT_DETAILS);
    }
}