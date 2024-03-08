import Unit, {IUnitDetails} from "@/models/Unit/Unit";
import Game from "@/models/Game/Game";
import {AnyEffect, DamageEffect, NullEffect} from "@/models/Game/Effect";
import Passive from "@/models/Game/Passive";

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
            description: MOVE_DESCRIPTION_2,
            targetType: 'ally'
        }
    ]
}

class LolShovelBird extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }

    async doSpecialMove(game: Game, index: number, targetUnit?: Unit): Promise<AnyEffect[]> {

        let passive = new LolShovelBird.ShovelPassive(this)

        let effects: AnyEffect[] = [];
        for(let teammate of this.team.units) {
            effects.push({
                type: 'add-passive',
                passive: passive,
                target: teammate,
                initiator: this
            })
        }

        return effects;
    }
}

namespace LolShovelBird {
    export class ShovelPassive extends Passive {
        public damageLeft: number = 8;
        constructor(
            parent: Unit
        ) {
            super(
                'shovel',
                'Shovel Trench',
                parent
            );
        }

        async onDamageTarget(game: Game, unit: Unit, turnEffect: DamageEffect): Promise<[NullEffect|DamageEffect, AnyEffect[]]> {
            if(turnEffect.type === 'damage') {
                if(this.damageLeft <= turnEffect.amount) {
                    game.log(this.parent.name, 'blocked', this.damageLeft, 'damage from', turnEffect.initiator.name)

                    let newDamage = turnEffect.amount - this.damageLeft;
                    this.damageLeft = 0;

                    let replacementEffect: NullEffect|DamageEffect = newDamage > 0 ?
                        {...turnEffect, amount: newDamage} :
                        {type: 'null', target: turnEffect.target, initiator: turnEffect.initiator}

                    let newEffects: AnyEffect[] = [];
                    for(let teammate of unit.team.units) {
                        newEffects.push({
                            type: 'remove-passive',
                            passive: this,
                            target: teammate,
                            initiator: this.parent
                        })
                    }

                    return [replacementEffect, newEffects]
                }
                else {
                    this.damageLeft -= turnEffect.amount;
                    game.log(this.parent.name, 'blocked', turnEffect.amount, 'damage from', turnEffect.initiator.name, `(${this.damageLeft} left)`)
                    return [{
                        type: 'null',
                        target: turnEffect.target,
                        initiator: turnEffect.initiator
                    }, []];
                }
            }

            return [turnEffect, []];
        }

    }
}

export default LolShovelBird