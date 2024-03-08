import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION_1 = `
Can get a gun and become a heavy hitter if it does not use a special ability for two moves. 
Once it has its gun out, it cannot use any special moves, but its second special ability is still active.
`.trim()

const MOVE_DESCRIPTION_2 = `
Neutralizes the meteor. If Robot Maid is on the same team as Meteor, it won’t kill a teammate with a low roll. 
If Robot Maid is on the opposing team from Meteor, then Meteor can’t insta-win the game with a high roll. 
It will still do 8 damage to everyone on the team.
`.trim()

const MOVE_DESCRIPTION_3 = `
Can choose a teammate with a potentially negative special ability and reduce the chances of a negative outcome by half.
`.trim()

const MOVE_DESCRIPTION_4 = `
Can cure any player of chlamydia.
`.trim()


export const UNIT_DETAILS: IUnitDetails = {
    id: 'RobotMaid',
    name: 'Robot Maid',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/robotmaid.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id:'hidden_gun',
            name: 'Hidden Gun',
            description: MOVE_DESCRIPTION_1
        },
        {
            id: 'space_rock_cleanup',
            name: 'Space Rock Cleanup',
            description: MOVE_DESCRIPTION_2
        }
    ],
    specialMoves: [
        {
            id: 'declutter',
            name: 'Declutter',
            description: MOVE_DESCRIPTION_3,
            targetType: 'ally'
        },
        {
            id: 'shes_a_nurse_too_uwu',
            name: 'She\'s a Nurse Too UwU',
            description: MOVE_DESCRIPTION_4,
            targetType: 'ally'
        },
    ]
}

export default class RobotMaid extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}