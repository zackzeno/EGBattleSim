import Unit, {IUnitDetails} from "@/models/Unit/Unit";

const MOVE_DESCRIPTION = `
Can choose a teammate to protect for one round. 
The attacking character will take the same amount of damage that they deal to the protected character. 
The chosen teammate will be kept secret from the other team.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'DoorWithLaserEyes',
    name: 'Door With Laser Eyes',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 2,
    color: 'red',
    image: '/card-images/doorwithlasereyes.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'laser_eyes',
            name: 'Laser Eyes',
            description: MOVE_DESCRIPTION,
            targetType: 'ally'
        }
    ]
}

export default class DoorWithLaserEyes extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}