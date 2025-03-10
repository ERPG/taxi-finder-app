import { useQuery } from "@tanstack/react-query";
import { fetchAllVehicles } from "../services/vehicles-service";
import { UnifiedVehicle } from "../models/vehicle";
import { PaginatedResults } from "../../../shared/models/pagination";

export const useVehicles = (limit: number, page: number) => {
  return useQuery<PaginatedResults<UnifiedVehicle[]>, Error>({
    queryKey: ["vehicles", limit, page],
    queryFn: async () => await fetchAllVehicles(limit, page),
    staleTime: 1000 * 60 * 5,
  });
};