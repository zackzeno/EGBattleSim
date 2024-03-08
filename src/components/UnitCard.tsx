import {IUnitDetails} from "@/models/Unit/Unit";
import {useState} from "react";
import ReactCardFlip from "react-card-flip";
import UnitCardFront from "@/components/UnitCardFront";
import UnitCardBack from "@/components/UnitCardBack";


interface Props {
    unit: IUnitDetails
    active?: boolean
}

// const colors = {
//     white: 'bg-white',
//     blue: 'bg-blue-50',
//     green: 'bg-green-50',
//     red: 'bg-red-50'
// }

const gradients = {
    white: 'bg-gradient-to-br from-white to-gray-100',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
    green: 'bg-gradient-to-br from-green-50 to-green-100',
    red: 'bg-gradient-to-br from-red-50 to-red-100',
}

export default function UnitCard({unit, active}: Props) {

    let [isFlipped, setFlipped] = useState(false);

    let classes = active ?
        `h-112 w-80 ${gradients[unit.color]} text-gray-800 rounded overflow-hidden outline outline-3 outline-slate-700 shadow-lg` :
        `h-112 w-80 ${gradients[unit.color]} text-gray-800 rounded overflow-hidden outline outline-1 outline-slate-400 shadow-lg`;

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