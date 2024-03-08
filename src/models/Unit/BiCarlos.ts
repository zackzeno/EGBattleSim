import Unit, {IUnitDetails} from "@/models/Unit/Unit";
import Game from "@/models/Game/Game";
import {AnyEffect} from "@/models/Game/Effect";
import Passive from "@/models/Game/Passive";

const MOVE_DESCRIPTION = `
Once per game, can lure on enemy. The enemy spends 1 turn trying to find Bi Carlos and cannot act that turn.
There is also a 50% chance that Bi Carlos traps that character in his webs and immobilizes them for a second turn.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'BiCarlos',
    name: 'Bi Carlos',
    baseHP: 15,
    currentHP: 15,
    attackDice: 8,
    attackBonus: 0,
    color: 'white',
    image: '/card-images/bicarlos.jpg',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'intriguing_lure',
            name: 'Intriguing Lure',
            description: MOVE_DESCRIPTION,
            targetType: 'enemy'
        }
    ]
}

class BiCarlos extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }

    async doSpecialMove(game: Game, index: number, target: Unit): Promise<AnyEffect[]> {

        return [
            {
                type: 'add-passive',
                passive: new BiCarlos.IntriguingLurePassive(this),
                initiator: this,
                target
            }
        ]

    }
}

namespace BiCarlos {
    export class IntriguingLurePassive extends Passive {
        public hadExtraTurn: boolean = false;
        constructor(
            parent: BiCarlos
        ) {
            super(
                'intriguing_lure',
                'Intriguing Lure',
                parent
            );
        }

        async onTurnStart(game: Game, unit: Unit): Promise<AnyEffect[]> {
            let effects: AnyEffect[] = [
                {
                    type: 'special',
                    target: unit,
                    initiator: this.parent,
                    code: 'skip_turn',
                }
            ];

            game.log(this.parent.name, 'stopped', unit.name, 'from taking their turn')
            let roll = await game.rollDice({
                initiator: this.parent,
                target: unit,
                type: 'special',
                dice: 20,
                bonus: 0,
                reason: 'Attempt Web'
            });
            if(this.hadExtraTurn || roll.result <= 10) {
                effects.push({
                    type: 'remove-passive',
                    passive: this,
                    target: unit,
                    initiator: this.parent
                })
            }
            else {
                this.hadExtraTurn = true;
            }

            return effects;
        }
    }
}

export default BiCarlos