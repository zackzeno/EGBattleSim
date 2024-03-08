"use client"

import '@/models/Unit/registerUnits';

import UnitCard from "@/components/UnitCard";
import {useMemo} from "react";
import Unit from "@/models/Unit/Unit";

export default function Home() {

    const ALL_UNITS = useMemo(() => Unit.getAllUnitIds().map(id => Unit.makeUnitInstance(id)), [])

    return (
      <div className="container mx-auto w-full flex flex-wrap justify-around">
          {
              ALL_UNITS.map((unit, i) => (
                  <div key={i} className="p-4">
                      <UnitCard unit={unit} />
                  </div>
              ))
          }
      </div>
    );
}
