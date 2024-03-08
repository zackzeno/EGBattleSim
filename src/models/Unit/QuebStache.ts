import Unit, {IUnitDetails} from "@/models/Unit/Unit";
import Game from "@/models/Game/Game";
import {AnyEffect} from "@/models/Game/Effect";
import Passive from "@/models/Game/Passive";
import {DieRoll} from "@/models/Game/DieRoll";

const MOVE_DESCRIPTION_1 = `
Gives +5 HP to teammates. Effect continues if Queb Stache dies.
`.trim()

const MOVE_DESCRIPTION_2 = `
Can add 2 to any teammate’s special roll for one turn.
`.trim()

const MOVE_DESCRIPTION_3 = `
Can add 3 to any teammate’s normal attack roll for one turn.
`.trim()


export const UNIT_DETAILS: IUnitDetails = {
    id: 'QuebStache',
    name: 'Queb Stache',
    baseHP: 10,
    currentHP: 10,
    attackDice: 4,
    attackBonus: 0,
    color: 'green',
    image: '/card-images/quebstache.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [
        {
            id: 'inspirational_stache',
            name: 'Inspirational Stache',
            description: MOVE_DESCRIPTION_1
        }
    ],
    specialMoves: [
        {
            id: 'normal_fake_mustache',
            name: 'Normal Fake Stache',
            description: MOVE_DESCRIPTION_2,
            targetType: 'ally'
        },
        {
            id: 'special_fake_mustache',
            name: 'Special Fake Stache',
            description: MOVE_DESCRIPTION_3,
            targetType: 'ally'
        }
    ]
}
class QuebStache extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }

    public async onStartGame(game: Game) {

        let effects: AnyEffect[] = [];

        for(let unit of this.team.units) {
            if(unit !== this) {
                effects.push({
                    type: 'heal',
                    initiator: this,
                    target: unit,
                    amount: 5,
                    allowAboveBase: true
                })
            }
        }

        return effects;
    }

    async doSpecialMove(game: Game, index: number, targetUnit: Unit): Promise<AnyEffect[]> {
        return [
            {
                type: 'add-passive',
                initiator: this,
                passive: new QuebStache.FakeMustachePassive(index == 1, game.currentTurn, this),
                target: targetUnit
            }
        ]
    }
}

namespace QuebStache {
    export class FakeMustachePassive extends Passive {

        constructor(public isNormal: boolean, public startTurn: number, parent: Unit) {
            super(
                isNormal ? 'normal_fake_mustache' : 'special_fake_mustache',
                isNormal ? 'Normal Fake Mustache' : 'Special Fake Mustache',
                parent,
                false,
                startTurn + 6
            );
        }

        async onBeforeRollDie(game: Game, unit: Unit, dieRoll: DieRoll): Promise<DieRoll> {
            if(unit == dieRoll.target) {
                return dieRoll;
            }

            if(this.isNormal && dieRoll.type === 'normal') {
                return {
                    ...dieRoll,
                    bonus: dieRoll.bonus + 3
                }
            }
            else if(!this.isNormal && dieRoll.type === 'special') {
                return {
                    ...dieRoll,
                    bonus: dieRoll.bonus + 2
                }
            }

            return dieRoll;
        }

    }
}

export default QuebStache