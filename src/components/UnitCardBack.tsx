import {IUnitDetails} from "@/models/Unit/Unit";
import UnitCardHeader from "@/components/UnitCardHeader";

interface Props {
    unit: IUnitDetails;
}

export default function UnitCardBack({unit}: Props) {

    return (
        <div className="w-full h-full flex flex-col p-1">
            <UnitCardHeader unit={unit} />

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