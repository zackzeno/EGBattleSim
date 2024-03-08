import Game from "@/models/Game/Game";
import {useEffect, useState} from "react";


interface Props {
    game: Game
}

export default function BattleLog({game}: Props) {

    let [log, setLog] = useState<string[]>([])

    useEffect(() => {
        let callback = (log: string[]) => setLog(log)
        game.addLogChangeCallback(callback)
        return () => game.removeLogChangeCallback(callback);
    }, [game])

    return (
        <div className="h-1/2 overflow-y-auto flex flex-col-reverse">
            <div>
                {
                    log.map((line, i) => (
                        <div key={i}>{line}</div>
                    ))
                }
            </div>
        </div>
    )
}