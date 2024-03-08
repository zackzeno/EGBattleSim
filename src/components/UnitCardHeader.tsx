import {IUnitDetails} from "@/models/Unit/Unit";


interface Props {
    unit: IUnitDetails
}

export default function UnitCardHeader({unit}: Props) {

    return (
        <>
            <div className="flex justify-between">
                <div>
                    HP:{" "}
                    {
                        unit.currentHP === unit.baseHP ?
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
        </>
    )
}