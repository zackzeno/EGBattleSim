"use client"

import {makeAllUnits} from "@/models/AllUnits";
import UnitCard from "@/components/UnitCard";
import {useEffect, useMemo, useState} from "react";

export default function Home() {

    const ALL_UNITS = useMemo(makeAllUnits, [])

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
