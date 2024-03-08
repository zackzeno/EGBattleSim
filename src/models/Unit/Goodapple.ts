import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `
The player who selects Goodapple/Tomontos chooses which character to play. This choice is not revealed to the other team unless they use an ability to uncover the secret.
`.trim()
const MOVE_DESCRIPTION_2 = `
Once per game, Goodapple can choose a teammate to heal for 1 damage every turn for the entire game. 
This healing is not revealed on screen or to the other team unless that character's displayed HP drops to 0 but their actual HP is greater than 0 or an ability is used to uncover the secret. 
HP can go above starting HP.
`.trim()
const MOVE_DESCRIPTION_3 = `
Once per game, Tomontos can choose an enemy to poison for 1 damage every turn for the entire game. 
This HP damage is not revealed on screen or to the other team unless it kills the enemy or an ability is used to uncover the secret.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'Goodapple',
    name: 'Goodapple / Tomontos',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'blue',
    image: '/card-images/tomontos.png',
    imageCredit: 'art by KikiLoswa',
    specialAbilities: [
        {
            id: 'hidden_choice',
            name: 'Hidden Choice',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: [
        {
            id: 'slow_healing',
            name: 'Slow Healing',
            description: MOVE_DESCRIPTION_2,
            targetType: 'ally'
        },
        {
            id: 'slow_poison',
            name: 'Slow Poison',
            description: MOVE_DESCRIPTION_3,
            targetType: 'enemy'
        }
    ]
}

export default class Goodapple extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}