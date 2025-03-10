import { renderHook, waitFor } from "@testing-library/react";
import { fetchAllVehicles } from "../../services/vehicles-service";
import { vi } from "vitest";
import { useVehicles } from "../use-vehicles";
import { QueryClientTestWrapper } from "@/tests/utils/query-client";

vi.mock("../../services/vehicles-service.ts", () => ({
    fetchAllVehicles: vi.fn(),
}));

describe("useVehicles hook", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should call fetchAllVehicles with correct parameters", async () => {
        const limit = 10;
        const page = 1;

        const mockData = {
            data: [{ id: 1, name: "Vehicle 1" }],
            totalItems: 1,
            pageSize: 10,
        };

        (fetchAllVehicles as jest.Mock).mockResolvedValue(mockData);

        const { result } = renderHook(() => useVehicles(limit, page), {
            wrapper: QueryClientTestWrapper,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(fetchAllVehicles).toHaveBeenCalledWith(limit, page);
    });

    test("should return correct data on success", async () => {
        const limit = 10;
        const page = 1;

        const mockData = {
            data: [{ id: 1, name: "Vehicle 1" }],
            totalItems: 1,
            pageSize: 10,
        };

        (fetchAllVehicles as jest.Mock).mockResolvedValue(mockData);


        const { result } = renderHook(() => useVehicles(limit, page), {
            wrapper: QueryClientTestWrapper,
        });
        
        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockData);
    });

    test("should handle errors correctly", async () => {
        const limit = 10;
        const page = 1;

        (fetchAllVehicles as jest.Mock).mockRejectedValue(new Error("Network Error"));

        const { result } = renderHook(() => useVehicles(limit, page), {
            wrapper: QueryClientTestWrapper,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));

          expect(result.current.error).toBeDefined();
          expect(result.current.error?.message).toBe("Network Error");
    });

});