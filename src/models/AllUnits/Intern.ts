import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
Spreads chlamydia to other players. 
Anyone, including a teammate, who uses any ability or attack on Intern has a 50% chance of catching chlamydia. 
Any character that Intern attacks has a 25% chance of catching chlamydia. 
Any character that catches chlamydia can spread it to other characters with the same rules. 
Characters with chlamydia have a 25% chance of not being able to do anything on a turn. 
Players will not be told that they have chlamydia unless it prevents them from acting or an ability is used to uncover it. 
Chlamydia can only be cured by Robot Maid.
`.trim()

export const UNIT_DETAILS: IUnitDetails =  {
    id: 'Intern',
    name: 'Intern',
    baseHP: 10,
    currentHP: 10,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/intern.jpg',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'chlamydia',
            name: 'Chlamydia',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: []
}

export default class Intern extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }

}