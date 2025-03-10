import { httpClient } from "@/shared/http/http-client";
import { vi } from "vitest";
import { fetchAllVehicles } from "../vehicles-service";

vi.mock("../../../../shared/http/http-client", () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

describe("fetchAllVehicles service", () => {
  const mockData = {
    data: [{ id: 1, name: "Vehicle 1" }],
    totalItems: 1,
    pageSize: 10,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch all vehicles successfully", async () => {
    (httpClient.get as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchAllVehicles(10, 1);

    expect(httpClient.get).toHaveBeenCalledWith("/all-vehicles?limit=10&page=1");
    expect(result).toEqual(mockData);
  });

  test("should throw an error when API response is empty", async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({ data: null });

    await expect(fetchAllVehicles(10, 1)).rejects.toThrow("No data available in response");
  });

  test("should throw an error when API request fails", async () => {
    (httpClient.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    await expect(fetchAllVehicles(10, 1)).rejects.toThrow("Failed to fetchAllVehicles vehicles: Network Error");
  });
});