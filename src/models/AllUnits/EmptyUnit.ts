import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `

`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    name: '',
    baseHP: 0,
    attackDice: 0,
    attackBonus: 0,
    image: '/card-images/',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: '',
            name: '',
            description: MOVE_DESCRIPTION
        }
    ]
}

export default class EmptyUnit extends Unit {

    constructor() {
        super(UNIT_DETAILS);
    }
}