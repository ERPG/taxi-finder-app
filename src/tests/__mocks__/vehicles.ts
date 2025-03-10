import { UnifiedVehicle } from "../../features/vehicles/models/vehicle"
import { PaginatedResults } from "../../shared/models/pagination"

export const mockUnifiedVehicle: UnifiedVehicle = {
    id: 100000001,
    type: 'FREENOW',
    licencePlate: 'hhhh-hhhh',
    coordinates: [0.000001, 0.000002],
    address: 'Barcelona',
    state: 'ACTIVE',
    condition: 'GOOD',
    fuel: 50
}

export const mockPaginatedResults: PaginatedResults<UnifiedVehicle[]> = {
    currentPage: 1,
    data: [mockUnifiedVehicle],
    pageSize: 6,
    totalItems: 1,
    totalPages: 1
}

export const mockMapVehicles: UnifiedVehicle[] = [
    {
        id: 1,
        type: 'FREENOW',
        licencePlate: 'ABC123',
        coordinates: [9.9937, 53.5511],
        address: "Hamburg, Germany",
        state: 'ACTIVE',
        condition: 'GOOD',
        fuel: 50
    },
    {
        id: 2,
        type: 'SHARENOW',
        licencePlate: 'XYZ789',
        coordinates: [10.0000, 53.5500],
        address: "Berlin, Germany",
        state: 'INACTIVE',
        condition: 'GOOD',
        fuel: 75
    },
];

export const mockTableVehicles = {
    data: mockMapVehicles,
    totalItems: 2,
    pageSize: 2,
    totalPages: 1,
    currentPage: 1
};
