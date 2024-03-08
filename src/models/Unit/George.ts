import Unit, {IUnitDetails} from "@/models/Unit/Unit";
import Game from "@/models/Game/Game";
import {AnyEffect} from "@/models/Game/Effect";
import _ from "lodash";

const MOVE_DESCRIPTION = `
Can dig through the garbage for a random effect, determined by a d8 roll. Healing can only go up to each character’s starting HP. The possible effects are 
1 = George deals 2 damage to himself. 
2 = George heals a random enemy 2 damage. 
3 = Nothing happens. 
4 = George heals living teammates 4 damage each. 
5 = George heals team 6 damage, spread evenly among all living characters. 
6 = George heals himself 6 damage. 
7 = George Deals 6 damage to a random enemy.  
8 = George deals 4 damage to each enemy. 
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    id: 'George',
    name: 'George',
    baseHP: 15,
    currentHP: 15,
    attackDice: 6,
    attackBonus: 0,
    color: 'green',
    image: '/card-images/george.png',
    imageCredit: 'art generated with AI',
    specialAbilities: [],
    specialMoves: [
        {
            id: 'trash_bandit',
            name: 'Trash Bandit',
            description: MOVE_DESCRIPTION,
            targetType: 'none'
        }
    ]
}

export default class George extends Unit {
    public static readonly id = UNIT_DETAILS.id;

    constructor() {
        super(UNIT_DETAILS);
    }

    async doSpecialMove(game: Game, index: number, targetUnit: Unit): Promise<AnyEffect[]> {

        let roll = await game.rollDice({
            type: 'special',
            initiator: this,
            dice: 8,
            bonus: 0,
            reason: 'Special Move'
        });

        switch(roll.result){
        case 1:
            return [
                {
                    type: 'damage',
                    initiator: this,
                    target: this,
                    amount: 2
                }
            ];
        case 2:
            return [
                {
                    type: 'heal',
                    initiator: this,
                    target: _.sample(this.team.otherTeam.units),
                    amount: 2,
                    allowAboveBase: false
                }
            ];
        case 3:
            return [];
        case 4:

            return this.team.units
                .filter(u => u.currentHP > 0)
                .map(target => ({
                    type: 'heal',
                    initiator: this,
                    target,
                    amount: 4,
                    allowAboveBase: false
                }))
        case 5:
            let numLiving = this.team.units.filter(u => u.currentHP > 0).length;
            let healAmount = Math.floor(6 / numLiving);

            return this.team.units
                .filter(u => u.currentHP > 0)
                .map(target => ({
                    type: 'heal',
                    initiator: this,
                    target,
                    amount: healAmount,
                    allowAboveBase: false
                }))
        case 6:
            return [
                {
                    type: 'heal',
                    initiator: this,
                    target: this,
                    amount: 6,
                    allowAboveBase: false
                }
            ];
        case 7:
            return [
                {
                    type: 'damage',
                    initiator: this,
                    target: _.sample(this.team.otherTeam.units),
                    amount: 6
                }
            ];
        case 8:
            return this.team.otherTeam.units
                .map(target => ({
                    type: 'damage',
                    initiator: this,
                    target,
                    amount: 4
                }))
        }

        throw new Error('Invalid Roll')

    }
}