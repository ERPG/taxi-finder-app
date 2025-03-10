import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type VehicleSelectionContextType = {
  selectedVehicleId: number | null;
  setSelectedVehicleId: Dispatch<SetStateAction<number | null>>;
};

const VehicleSelectionContext = createContext<VehicleSelectionContextType>({
  selectedVehicleId: null as number | null,
  setSelectedVehicleId: () => {},
});

export const VehicleSelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  return (
    <VehicleSelectionContext.Provider value={{ selectedVehicleId, setSelectedVehicleId }}>
      {children}
    </VehicleSelectionContext.Provider>
  );
};

export const useVehicleSelection = () => useContext(VehicleSelectionContext);