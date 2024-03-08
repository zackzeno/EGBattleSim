import Unit, {IUnitDetails} from "@/models/Unit/Unit";
import {AnyEffect} from "@/models/Game/Effect";
import Game, {SlotID} from "@/models/Game/Game";

const MOVE_DESCRIPTION = `
Has a shotgun that it can use once per game. The shotgun does d6 damage to the targeted character and does half that much damage to any adjacent characters.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'Gunana',
    name: 'Gunana',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 2,
    color: 'red',
    image: '/card-images/gunana.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'shotgun',
            name: 'Shotgun',
            description: MOVE_DESCRIPTION,
            targetType: 'enemy'
        }
    ]
}

export default class Gunana extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }

    async doSpecialMove(game: Game, index: number, targetUnit: Unit): Promise<AnyEffect[]> {
        let targets: SlotID[];

        let damageAmount = await game.rollDice({
            initiator: this,
            target: targetUnit,
            type: 'special',
            dice: 6,
            bonus: 0,
            reason: 'Shotgun Damage'
        });

        if(targetUnit.slotID == 0) {
            targets = [0, 1];
        }
        else if(targetUnit.slotID == 1) {
            targets = [0, 1, 2];
        }
        else {
            targets = [1, 2];
        }

        return targets.map(targetSlot => ({
            type: 'damage',
            initiator: this,
            target: targetUnit.team.units[targetSlot],
            amount: targetSlot == targetUnit.slotID ? damageAmount.result : Math.floor(damageAmount.result / 2)
        }))
    }
}