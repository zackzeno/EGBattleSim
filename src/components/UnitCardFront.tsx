import Image from "next/image";
import {IUnitDetails} from "@/models/Unit";

interface Props {
    unit: IUnitDetails;
}

export default function UnitCardFront({unit}: Props) {

    return (
        <div className="w-full h-full flex flex-col">
            <div className="grow p-1 text-slate-800">
                <div className="flex justify-between text-base">
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
                <div className="text-2xl font-medium font-serif">
                    <div>{unit.name}</div>
                </div>

                <div className="flex flex-row">
                    <div className="w-1/2 flex flex-col">
                        <div className="text-2xs font-light">Moves</div>
                        {unit.specialMoves.map((move, i) => (
                            <div key={i} className="text-sm font-serif">{move.name}</div>
                        ))}
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <div className="text-2xs font-light">Abilities</div>
                        {unit.specialAbilities.map((move, i) => (
                            <div key={i} className="text-sm font-serif">{move.name}</div>
                        ))}
                    </div>
                </div>

            </div>
            <div>
                <div className="pl-1 text-2xs font-light text-slate-500 border-b border-slate-400">{unit.imageCredit}</div>
                <div className="bg-white">
                    <Image src={`/EGBattleSim${unit.image}`} alt="Card Photo" width={320} height={320} />
                </div>
            </div>
        </div>
    )
}