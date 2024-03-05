import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
Once per game, can permanently swap all special moves and abilities between any two players, not including himself. 
Any special move that can only be used a limited number of times will not be reset after being swapped. 
This does not swap HP or attack stats.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'SvenTorgerson',
    name: 'Sven Torgerson',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/sventorgerson.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'ivao_fsc_cheater',
            name: 'IVAO FSC Cheater',
            description: MOVE_DESCRIPTION
        }
    ]
}

export default class SvenTorgerson extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}