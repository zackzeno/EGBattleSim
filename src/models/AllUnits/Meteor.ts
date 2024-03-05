import Unit, {IUnitDetails} from "@/models/Unit";
import Game, {SlotID, TeamID, TurnEffect} from "@/models/Game";

const MOVE_DESCRIPTION = `
Rolls a d20 each round. 
1 = kills random teammate and dies. 
2-8 = self-destructs. 
9-14 = nothing happens. 
15-19 = kills one random enemy and dies. 
20 = instantly kills the other team and wins the game. 
Kills negate all defense and protections except the Robot Maid.
`.trim()

export const UNIT_DETAILS: IUnitDetails = {
    name: 'Meteor',
    baseHP: 20,
    attackDice: 0,
    attackBonus: 0,
    color: 'blue',
    image: '/card-images/meteor.jpg',
    imageCredit: 'Meteor art generated with AI',
    specialAbilities: [
        {
            id: 'meteor',
            name: 'METEOR',
            description: MOVE_DESCRIPTION
        }
    ],
    specialMoves: []
}

export default class Meteor extends Unit {

    constructor() {
        super(UNIT_DETAILS);
    }

    async doTurn(game: Game, myTeam: TeamID, mySlot: SlotID): Promise<TurnEffect[]> {

        let roll = await game.rollDice(20, 0);

        if(roll == 1) {
            let teammateRoll = Math.floor(Math.random() * 2) + 1;

            return [
                {
                    type: 'special',
                    isNegative: true,
                    code: 'meteor-kill',
                    metadata: {
                        targetTeam: myTeam,
                        targetSlot: mySlot + teammateRoll % 3,
                        killTeammate: true
                    }
                }
            ];
        }

        if(roll < 9) {
            return [
                {
                    type: 'special',
                    isNegative: true,
                    code: 'meteor-kill',
                    metadata: {
                        targetTeam: myTeam,
                        targetSlot: mySlot,
                    }
                }
            ];
        }

        if(roll < 15) {
            return [];
        }

        if(roll < 20) {
            let enemyRoll = Math.floor(Math.random() * 3);

            return [
                {
                    type: 'special',
                    isNegative: true,
                    code: 'meteor-kill',
                    metadata: {
                        targetTeam: myTeam + 1 % 2 as TeamID,
                        targetSlot: enemyRoll
                    }
                }
            ]
        }

        return [
            {
                type: 'special',
                code: 'meteor-win',
                metadata: {
                    targetTeam: myTeam
                }
            }
        ];
    }
}