import Unit, {IUnitDetails} from "@/models/Unit";

const MOVE_DESCRIPTION = `
1. Can hide any teammate from The Great Moth Detective for one turn.
2. Can subtract 1 from any enemy’s special roll for one turn.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'TheGhost',
    name: 'The Ghost',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 2,
    color: 'red',
    image: '/card-images/theghost.jpg',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'the_rules_are_rigged',
            name: 'The Rules Are Rigged',
            description: MOVE_DESCRIPTION
        }
    ]
}

export default class TheGhost extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }
}