import { describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import VehiclesMap from "../vehicles-map";
import { mockMapVehicles } from "../../../../../tests/__mocks__/vehicles";

describe('vehicles map component suite', () => {

    const props = {
        vehicles: mockMapVehicles,
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("Should match snapshot", () => {
        const { container } = render(<VehiclesMap {...props} />);
        expect(container).toMatchSnapshot();
    });

    test("should render the map with correct center and zoom", () => {
        render(<VehiclesMap {...props} />);

        expect(document.querySelector(".leaflet-container")).toBeInTheDocument();
        expect(document.querySelector(".leaflet-tile")).toBeInTheDocument();
    });

    test("should render markers for all vehicles", () => {
        render(<VehiclesMap {...props}/>);

        const markers = document.querySelectorAll(".leaflet-marker-icon");
        expect(markers).toHaveLength(props.vehicles.length);
    });
});

