import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
Can dig through the garbage for a random effect, determined by a d8 roll. The possible effects are 
1 = George deals 2 damage to himself. Each effect is equally likely to occur. Healing can only go up to each character’s starting HP.
2 = George heals a random enemy 2 damage. 
3 = Nothing happens. 
4 = George heals living teammates 4 damage each. 
5 = George heals team 6 damage, spread evenly among all living characters. 
6 = George heals himself 6 damage. 
7 = George Deals 6 damage to a random enemy.  
8 = George deals 4 damage to each enemy. 
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'George',
    name: 'George',
    baseHP: 15,
    currentHP: 15,
    attackDice: 6,
    attackBonus: 0,
    color: 'green',
    image: '/card-images/george.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'trash_bandit',
            name: 'Trash Bandit',
            description: MOVE_DESCRIPTION
        }
    ]
}

export default class George extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}