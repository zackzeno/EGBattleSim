"use client"

import UnitCard from "@/components/UnitCard";
import {makeAllUnits} from "@/models/AllUnits";
import HPEditor from "@/components/HPEditor";
import Game, {IGameState} from "@/models/Game";
import Team from "@/models/Team";
import {useEffect, useMemo, useState} from "react";

export default function Battle() {

    const game = useMemo(() => {

        // if(typeof localStorage !== 'undefined') {
        //     let existingGameState = localStorage.getItem('current_game');
        //     if(existingGameState) {
        //         return Game.fromGameState(JSON.parse(existingGameState));
        //     }
        // }


        const ALL_UNITS = makeAllUnits();
        return new Game([
            new Team('Team A', [
                ALL_UNITS[0],
                ALL_UNITS[1],
                ALL_UNITS[2]
            ]),
            new Team('Team Z', [
                ALL_UNITS[3],
                ALL_UNITS[4],
                ALL_UNITS[5]
            ])
        ])

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
                    <UnitCard unit={gameState.teams[0].units[0]} />
                    <UnitCard unit={gameState.teams[0].units[2]} />
                </div>
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={gameState.teams[0].units[1]} />
                </div>
            </div>
            <div className="w-2/5 bg-slate-300 flex">
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={gameState.teams[1].units[1]} />
                </div>
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={gameState.teams[1].units[0]} />
                    <UnitCard unit={gameState.teams[1].units[2]} />
                </div>
            </div>
            <div className="w-1/5 pb-10 bg-slate-400 flex flex-col justify-end">
                <HPEditor game={game} onUpdate={() => {game.incrementTurn()}} />
            </div>
        </div>
    )


}