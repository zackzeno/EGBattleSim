"use client"

import UnitCard from "@/components/UnitCard";
import ALL_UNITS from "@/models/AllUnits";

ALL_UNITS[0].dealDamage(3)

export default function Battle() {

    return (
        <div className="w-full h-[calc(100vh-64px)] flex items-stretch">
            <div className="w-2/5 bg-slate-200 flex">
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={ALL_UNITS[0]} />
                    <UnitCard unit={ALL_UNITS[2]} />
                </div>
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={ALL_UNITS[1]} />
                </div>
            </div>
            <div className="w-2/5 bg-slate-300 flex">
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={ALL_UNITS[4]} />
                </div>
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <UnitCard unit={ALL_UNITS[3]} />
                    <UnitCard unit={ALL_UNITS[5]} />
                </div>
            </div>
            <div className="w-1/5 bg-slate-400">
                <div className="">

                </div>
            </div>
        </div>
    )


}