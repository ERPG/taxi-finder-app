export type FreeNowVehicle = {
    id: number;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    state: 'ACTIVE' | 'INACTIVE';
    licencePlate: string;
    condition: 'GOOD' | 'BAD';
}

export type ShareNowVehicle = {
    id: number;
    coordinates: [number, number, number?];
    address: string;
    engineType: 'PETROL' | 'ELECTRIC';
    condition: 'GOOD' | 'BAD';
    fuel: number;
    state: 'ACTIVE' | 'INACTIVE';
    licencePlate: string;
}

export type UnifiedVehicle = {
    id: number;
    type: 'FREENOW' | 'SHARENOW';
    licencePlate: string;
    coordinates: [number, number];
    address: string | null;
    state: 'ACTIVE' | 'INACTIVE';
    condition: 'GOOD' | 'BAD';
    fuel: number | null;
}
