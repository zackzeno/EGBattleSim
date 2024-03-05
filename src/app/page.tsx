"use client"

import ALL_UNITS from "@/models/AllUnits";
import UnitCard from "@/components/UnitCard";

export default function Home() {
  return (
      <div className="container mx-auto w-full flex flex-wrap">
          {
              ALL_UNITS.map((unit, i) => (
                  <div key={i} className="p-2">
                      <UnitCard unit={unit} />
                  </div>
              ))
          }
      </div>
  );
}
