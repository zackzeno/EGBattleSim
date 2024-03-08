import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `
Spends odd-numbered rounds as Knightnana, who gets +2 attack, and spends even-numbered rounds as Nightnana, which cannot attack, but can only be damaged by heavy hitters. 
Heavy hitters will not have the +2 added to their attacks on Nightnana.
`.trim()

const MOVE_DESCRIPTION_2 = `
Can only be used as Knightnana
Knightnana can choose any teammate to defend and prevent it form taking any damage for one round.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'Knightnana',
    name: 'Knightnana / Nightnana',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 2,
    color: 'blue',
    image: '/card-images/knightnana.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'homophones',
            name: 'Homophones',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: [
        {
            id: 'protect_the_vulnerable',
            name: 'Protect the Vulnerable',
            description: MOVE_DESCRIPTION_2,
            targetType: 'ally'
        }
    ]
}

export default class Knightnana extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}