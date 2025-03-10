import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import VehiclesFeature from "..";
import { QueryClientTestWrapper } from "../../../tests/utils/query-client";
import { mockPaginatedResults } from "../../../tests/__mocks__/vehicles";
import { VehiclesTableProps } from "../components/vehicles-table/vehicles-table";
import { VehiclesMapProps } from "../components/vehicles-map/vehicles-map";
import { PAGE_LIMIT } from "@/shared/utils/constants";
import { useVehicles } from "../hooks/use-vehicles";

vi.mock("../hooks/use-vehicles", () => ({
    useVehicles: vi.fn(),
}));

vi.mock("../components/vehicles-map/vehicles-map", () => ({
    default: ({ vehicles }: VehiclesMapProps) => (
        <div>
            Vehicles Map - results: {vehicles?.length}
        </div>
    ),
}));

vi.mock("../components/vehicles-table/vehicles-table", () => ({
    default: ({ vehicles, onCurrentPageChange, currentPage }: VehiclesTableProps) => (
        <div>
            Vehicles Table - results: {vehicles?.totalItems} - page: {currentPage}
            <button
                onClick={() => onCurrentPageChange(2)}
                data-testid="change-page-button"
            >
                Change Page
            </button>
        </div>
    ),
}));

describe('vehicles feature component suite', () => {
    beforeEach(() => {
        (useVehicles as ReturnType<typeof vi.fn>).mockReturnValue({
            data: mockPaginatedResults,
            isLoading: false,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const vehiclesFeatureComp = (
        <QueryClientTestWrapper>
            <VehiclesFeature />
        </QueryClientTestWrapper>
    )

    test("Should match snapshot", () => {
        const { container } = render(vehiclesFeatureComp);
        expect(container).toMatchSnapshot();
    });

    test("should call useVehicles with correct parameters", () => {
        (useVehicles as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null,
            isLoading: true,
        });

        render(vehiclesFeatureComp);

        expect(useVehicles).toHaveBeenCalledWith(PAGE_LIMIT, 1);
    });

    test("should render loading state initially", () => {
        (useVehicles as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null,
            isLoading: true,
        });

        render(vehiclesFeatureComp);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("should render vehicles data in child components when loaded", () => {
        render(vehiclesFeatureComp);

        expect(screen.getByText("Vehicles Map - results: 1")).toBeInTheDocument();
        expect(screen.getByText("Vehicles Table - results: 1 - page: 1")).toBeInTheDocument();
    });

    test("should update currentPage when onCurrentPageChange is called", () => {
        render(vehiclesFeatureComp);

        const changePageButton = screen.getByTestId("change-page-button");
        fireEvent.click(changePageButton);

        expect(screen.getByText("Vehicles Table - results: 1 - page: 2")).toBeInTheDocument();
    });
})