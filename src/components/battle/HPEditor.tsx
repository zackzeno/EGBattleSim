import Game from "@/models/Game/Game";
import Unit from "@/models/Unit/Unit";
import {useState} from "react";




interface UnitHealthProps {
    unit: Unit;
    onChange(health: number): void;
}
function UnitHealth({unit, onChange}: UnitHealthProps) {

    return (
        <div>
            <span>{unit.name}</span>
            <input type="number" value={unit.currentHP} onChange={(e) => onChange(e.target.valueAsNumber)} />
        </div>
    )
}


interface Props {
    game: Game,
    onUpdate(): void;
}

export default function HPEditor({game, onUpdate}: Props) {

    let [units, setUnits] = useState([
        game.teams[0].units[0],
        game.teams[0].units[1],
        game.teams[0].units[2],
        game.teams[1].units[0],
        game.teams[1].units[1],
        game.teams[1].units[2]
    ])

    const setNewHealth = (index: number, newHealth: number) => {
        units[index].setHealth(newHealth);

        setUnits([...units]);
    }

    return (
        <div className="flex flex-col p-3">
            <div className="flex justify-between text-slate-800">
                <div className="flex flex-col basis-0">
                    <UnitHealth unit={game.teams[0].units[0]} onChange={health => setNewHealth(0, health)} />
                    <UnitHealth unit={game.teams[0].units[1]} onChange={health => setNewHealth(1, health)} />
                    <UnitHealth unit={game.teams[0].units[2]} onChange={health => setNewHealth(2, health)} />
                </div>
                <div className="flex flex-col basis-0">
                    <UnitHealth unit={game.teams[1].units[0]} onChange={health => setNewHealth(3, health)} />
                    <UnitHealth unit={game.teams[1].units[1]} onChange={health => setNewHealth(4, health)} />
                    <UnitHealth unit={game.teams[1].units[2]} onChange={health => setNewHealth(5, health)} />
                </div>
            </div>
            <div className="flex justify-around mt-4">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => onUpdate()} >
                    Update Health
                </button>
            </div>
        </div>
    )
}