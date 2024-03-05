import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
Puppeteers any enemy directly killed by Bone Daddy for one turn. 
Bone Daddy can use the normal attack or any ability of that enemy character as if they were still alive. 
The enemy character's actions will take place at the very end of the round, and then that character will die. 
No attacks or buffs on the puppet character will have any effect.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'BoneDaddy',
    name: 'Bone Daddy',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/bonedaddy.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'puppeteer',
            name: 'Puppeteer',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: []
}

export default class BoneDaddy extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}