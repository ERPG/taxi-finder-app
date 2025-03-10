import { describe, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import VehiclesTable, { VehiclesTableProps } from "../vehicles-table";
import { mockTableVehicles, mockUnifiedVehicle } from "../../../../../tests/__mocks__/vehicles";

vi.mock(import("@freenow/wave"), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        TableRowSkeleton: () => <div data-testid="vehicle-table-row-skeleton"></div>,
    }
});

describe('vehicles table component suite', () => {
    const mockOnCurrentPageChange = vi.fn();

    const props: VehiclesTableProps = {
        vehicles: mockTableVehicles,
        currentPage: 1,
        onCurrentPageChange: mockOnCurrentPageChange,
        isLoading: false,
    };

    test("Should match snapshot", () => {
        const { container } = render(<VehiclesTable {...props} />);
        expect(container).toMatchSnapshot();
    });

    test("should render the table with correct headers", () => {
        render(<VehiclesTable {...props} />);

        expect(screen.getByText("Type")).toBeInTheDocument();
        expect(screen.getByText("Licence Plate")).toBeInTheDocument();
        expect(screen.getByText("Coordinates")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("State")).toBeInTheDocument();
        expect(screen.getByText("Condition")).toBeInTheDocument();
    });

    test("should render loading state when isLoading is true", () => {
        render(<VehiclesTable {...props} isLoading={true} />);

        const skeletonRows = screen.getAllByTestId("vehicle-table-row-skeleton");
        expect(skeletonRows).toHaveLength(mockTableVehicles.pageSize);
    });

    test("should render rows for all vehicles", () => {
        render(<VehiclesTable {...props} />);

        mockTableVehicles.data.forEach((vehicle) => {
            expect(screen.getByTestId(`vehicle-row-${vehicle.id}`)).toBeInTheDocument();
            expect(screen.getByText(vehicle.type)).toBeInTheDocument();
            expect(screen.getByText(vehicle.licencePlate)).toBeInTheDocument();
            expect(screen.getByText(`${vehicle.coordinates[1]}, ${vehicle.coordinates[0]}`)).toBeInTheDocument();
            expect(screen.getByText(vehicle.address as string)).toBeInTheDocument();
            expect(screen.getByText(vehicle.state === "ACTIVE" ? "Active" : "Inactive")).toBeInTheDocument();
        });
    });

    test("should render pagination controls", () => {
        render(<VehiclesTable {...props} />);

        const pagination = screen.getByTestId("vehicles-pagination-container");
        expect(pagination).toBeInTheDocument();
    });

    test("should call onCurrentPageChange when pagination controls are clicked", () => {
        const NUMBER_OF_ITEMS = 7;
        const newVhArr = Array.from({ length: NUMBER_OF_ITEMS }, () => mockUnifiedVehicle);

        const customProps: VehiclesTableProps = {
            ...props,
            vehicles: {
                ...props.vehicles,
                data: newVhArr,
                totalItems: NUMBER_OF_ITEMS,
                pageSize: NUMBER_OF_ITEMS - 1,
                totalPages: 2,
                currentPage: 1
            },
        };

        render(<VehiclesTable {...customProps} />);

        fireEvent.click(screen.getByLabelText("Next"));
        expect(customProps.onCurrentPageChange).toHaveBeenCalledWith(expect.any(Function));
    });

    test("should handle empty vehicles data", () => {
        const customProps: VehiclesTableProps = {
            ...props,
            vehicles: {
                ...props.vehicles,
                data: [],
                totalItems: 0,
                pageSize: 6,
                totalPages: 2,
                currentPage: 1
            },
        };

        render(<VehiclesTable {...customProps} />);

        expect(screen.queryByTestId(/vehicle-row-/)).not.toBeInTheDocument();
    });
});