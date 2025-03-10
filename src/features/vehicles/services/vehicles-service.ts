import { httpClient } from "../../../shared/http/http-client";
import { PaginatedResults } from "../../../shared/models/pagination";
import { UnifiedVehicle } from "../models/vehicle";

export const fetchAllVehicles = async (limit: number, page: number): Promise<PaginatedResults<UnifiedVehicle[]>> => {
    try {
        const response = await httpClient.get<PaginatedResults<UnifiedVehicle[]>>(`/all-vehicles?limit=${limit}&page=${page}`);

        if (response.data) {
            return response;
        }

        throw new Error("No data available in response");
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetchAllVehicles vehicles: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetch All Vehicles");
    }
};
