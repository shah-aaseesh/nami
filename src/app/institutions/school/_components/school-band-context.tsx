"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type SchoolBandTab = "primary" | "secondary";

type SchoolBandContextValue = {
  activeBand: SchoolBandTab;
  setActiveBand: (band: SchoolBandTab) => void;
};

const SchoolBandContext = createContext<SchoolBandContextValue | null>(null);

export function SchoolBandProvider({ children }: { children: ReactNode }) {
  const [activeBand, setActiveBand] = useState<SchoolBandTab>("primary");
  return (
    <SchoolBandContext.Provider value={{ activeBand, setActiveBand }}>
      {children}
    </SchoolBandContext.Provider>
  );
}

export function useSchoolBand() {
  const context = useContext(SchoolBandContext);
  if (!context) {
    throw new Error("useSchoolBand must be used within a SchoolBandProvider");
  }
  return context;
}
