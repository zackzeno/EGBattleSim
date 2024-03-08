import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `
All damage to Capitalist Cat from enemy attacks is subtracted by 4 minus the number of players alive on Capitalist Cat's team. 
(-1 damage if entire team is alive. -2 damage if one teammate is alive. -3 damage if only Capitalist Cat is alive). 
Cannot be on the same team as Union Dragon.
`.trim()

const MOVE_DESCRIPTION_2 = `
Can choose an enemy and halve their damage done on their next turn. Calculated before any special ability damage subtraction is calculated.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'CapitalistCat',
    name: 'Capitalist Cat',
    baseHP: 15,
    currentHP: 15,
    attackDice: 6,
    attackBonus: 0,
    color: 'green',
    image: '/card-images/capitalistcat.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'monopolist',
            name: 'Monopolist',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: [
        {
            id: 'predatory_pricing',
            name: 'Predatory Pricing',
            description: MOVE_DESCRIPTION_2,
            targetType: 'enemy'
        }
    ]
}

export default class CapitalistCat extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}