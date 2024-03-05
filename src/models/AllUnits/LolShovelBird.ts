import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
Does the full d8 + 2 damage to Nightnana.
`.trim()
const MOVE_DESCRIPTION_2 = `
Can spend one turn digging a trench that will completely cancel the next 8 points of damage taken by its team. 
The damage reduction will begin at the beginning of lol shovel bird’s subsequent turn. 
This ability can only be used if there is not currently an active trench.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'LolShovelBird',
    name: 'lol shovel bird',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 2,
    color: 'red',
    image: '/card-images/lolshovelbird.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'lol_heaviest_hitter',
            name: 'lol heaviest hitter',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: [
        {
            id: 'shovel',
            name: 'Shovel',
            description: MOVE_DESCRIPTION_2
        }
    ]
}

export default class LolShovelBird extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}