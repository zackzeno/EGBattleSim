import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `
Adds 1 to all damage done by teammates for each teammate that is still alive. 
(+2 damage if both teammates are alive, +1 damage if only one is alive). 
Cannot be on the same team as Capitalist Cat.
`.trim()
const MOVE_DESCRIPTION_2 = `
Can choose a teammate and take all damage done to that teammate for one round.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'UnionDragon',
    name: 'Union Dragon',
    baseHP: 20,
    currentHP: 20,
    attackDice: 6,
    attackBonus: 0,
    color: 'green',
    image: '/card-images/uniondragon.webp',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'collective_bargaining',
            name: 'Collective Bargaining',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: [
        {
            id: 'employee_rights',
            name: 'Employee Rights',
            description: MOVE_DESCRIPTION_2,
            targetType: 'ally'
        }
    ]
}

export default class UnionDragon extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}