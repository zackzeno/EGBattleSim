import {IUnitDetails} from "@/models/Unit";

interface Props {
    unit: IUnitDetails;
}

export default function UnitCardBack({unit}: Props) {

    return (
        <div className="w-full h-full flex flex-col p-1">
            <div className="flex justify-between">
                <div>
                    HP:{" "}
                    {
                        unit.currentHP === undefined || unit.currentHP == unit.baseHP ?
                            unit.baseHP :
                            unit.currentHP > unit.baseHP ?
                                <span className="text-green-600">{unit.currentHP}</span> :
                                <span className="text-red-600">{unit.currentHP}</span>
                    }
                </div>
                <div>Attack: d{unit.attackDice} {unit.attackBonus > 0 && `+ ${unit.attackBonus}`}</div>
            </div>
            <div className="text-2xl font-medium">
                <div>{unit.name}</div>
            </div>

            <div className="flex flex-col mt-4">
                {unit.specialAbilities.length ? (
                    <>
                        <div className="text-2xs font-light">Abilities</div>
                        {unit.specialAbilities.map((move, i) => (
                            <div key={i}>
                                <div className="text-sm font-serif">{move.name}</div>
                                <div className="text-xs whitespace-pre-wrap">{move.description}</div>
                            </div>
                        ))}
                    </>
                ) : null}

                {unit.specialMoves.length ? (
                    <>
                        <div className="text-2xs font-light mt-2">Moves</div>
                        {unit.specialMoves.map((move, i) => (
                            <div key={i}>
                                <div className="text-sm font-serif">{move.name}</div>
                                <div className="text-xs whitespace-pre-wrap">{move.description}</div>
                            </div>
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}