import {IUnitDetails} from "@/models/Unit";
import {useState} from "react";
import ReactCardFlip from "react-card-flip";
import UnitCardFront from "@/components/UnitCardFront";
import UnitCardBack from "@/components/UnitCardBack";


interface Props {
    unit: IUnitDetails
}

const colors = {
    white: 'bg-white',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    red: 'bg-red-50'
}

export default function UnitCard({unit}: Props) {

    let [isFlipped, setFlipped] = useState(false);

    let classes = `h-112 w-80 ${colors[unit.color]} text-slate-800 rounded overflow-hidden outline outline-1 outline-slate-400 shadow-lg`;

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped}>
                <div className={classes} onClick={() => setFlipped(true)}>
                    <UnitCardFront unit={unit} />
                </div>

                <div className={classes} onClick={() => setFlipped(false)}>
                    <UnitCardBack unit={unit} />
                </div>
            </ReactCardFlip>
        </div>
    )


}