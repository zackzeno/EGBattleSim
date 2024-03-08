"use client"

import '@/models/Unit/registerUnits';

import UnitCard from "@/components/UnitCard";
import HPEditor from "@/components/battle/HPEditor";
import Game, {IGameState} from "@/models/Game/Game";
import Team from "@/models/Game/Team";
import {useEffect, useMemo, useState} from "react";
import Unit from "@/models/Unit/Unit";
import BiCarlos from "@/models/Unit/BiCarlos";
import George from "@/models/Unit/George";
import LolShovelBird from "@/models/Unit/LolShovelBird";
import Gunana from "@/models/Unit/Gunana";
import QuebStache from "@/models/Unit/QuebStache";
import Speed from "@/models/Unit/Speed";
import BattleLog from "@/components/battle/BattleLog";

export default function Battle() {

    const game = useMemo(() => {

        // if(typeof localStorage !== 'undefined') {
        //     let existingGameState = localStorage.getItem('current_game');
        //     if(existingGameState) {
        //         return Game.fromGameState(JSON.parse(existingGameState));
        //     }
        // }

        return new Game([
            new Team('Team A', [
                Unit.makeUnitInstance(QuebStache.id),
                Unit.makeUnitInstance(LolShovelBird.id),
                Unit.makeUnitInstance(BiCarlos.id)
            ]),
            new Team('Team Z', [
                Unit.makeUnitInstance(George.id),
                Unit.makeUnitInstance(Gunana.id),
                Unit.makeUnitInstance(Speed.id)
            ])
        ]);

    }, []);

    const [gameState, setGameState] = useState<IGameState|undefined>(undefined);

    useEffect(() => {
        const callback = ((gameState: IGameState) => {
            setGameState(gameState);
        });

        game.addStateChangeCallback(callback);

        return () => {
            game.removeStateChangeCallback(callback);
        }
    }, [game, setGameState])


    // useEffect(() => {
    //     if(gameState) {
    //         localStorage.setItem('current_game', JSON.stringify(gameState))
    //     }
    // }, [gameState])

    if(!gameState) {
        return (<div></div>)
    }

    console.log('Rendering turn', gameState.currentTurn);

    return (
        <div className="w-full h-[calc(100vh-64px)] flex items-stretch">
            <div className="w-2/5 bg-slate-200 flex">
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={gameState.teams[0].units[0]} active={gameState.teams[0].units[0].id == gameState.currentUnit} />
                    <UnitCard unit={gameState.teams[0].units[2]} active={gameState.teams[0].units[2].id == gameState.currentUnit}  />
                </div>
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={gameState.teams[0].units[1]} active={gameState.teams[0].units[1].id == gameState.currentUnit}  />
                </div>
            </div>
            <div className="w-2/5 bg-slate-300 flex">
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={gameState.teams[1].units[1]} active={gameState.teams[1].units[1].id == gameState.currentUnit}  />
                </div>
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={gameState.teams[1].units[0]} active={gameState.teams[1].units[0].id == gameState.currentUnit}  />
                    <UnitCard unit={gameState.teams[1].units[2]} active={gameState.teams[1].units[2].id == gameState.currentUnit}  />
                </div>
            </div>
            <div className="w-1/5 pb-10 bg-slate-400 flex flex-col justify-between">
                <BattleLog game={game} />
                {/*<HPEditor game={game} onUpdate={() => {game.incrementTurn()}} />*/}
                <div className="flex justify-around mt-4">
                    {
                        !game.gameState.started ?
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => game.startGame()} >
                                Start Game
                            </button> :
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => game.runTurn()} >
                                Run Turn
                            </button>
                    }
                </div>
            </div>
        </div>
    )


}