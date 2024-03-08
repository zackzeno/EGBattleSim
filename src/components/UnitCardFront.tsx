import Image from "next/image";
import {IUnitDetails} from "@/models/Unit/Unit";
import UnitCardHeader from "@/components/UnitCardHeader";

interface Props {
    unit: IUnitDetails;
}

export default function UnitCardFront({unit}: Props) {

    return (
        <div className="w-full h-full flex flex-col">
            <div className="grow p-1">
                <UnitCardHeader unit={unit} />

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
                <div className="pl-1 text-2xs font-light text-slate-500 border-b border-slate-400">{unit.name} {unit.imageCredit}</div>
                <div className="bg-white">
                    <Image src={unit.image} alt="Card Photo" width={320} height={320} />
                </div>
            </div>
        </div>
    )
}