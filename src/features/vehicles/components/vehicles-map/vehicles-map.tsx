import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { UnifiedVehicle } from "../../models/vehicle";
import { CarIcon } from "@freenow/wave";
import ReactDOMServer from "react-dom/server";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useVehicleSelection } from "../../contexts/select-vehicle.context";

export type VehiclesMapProps = {
    vehicles: UnifiedVehicle[] | undefined;
}

const AdjustZoomToFit = ({ vehicles }: { vehicles: UnifiedVehicle[] }) => {
    const map = useMap();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (vehicles.length > 0) {
            const bounds = L.latLngBounds(
                vehicles.map((vehicle) => [vehicle.coordinates[1], vehicle.coordinates[0]])
            );
            map.fitBounds(bounds, { padding: [50, 50] });
            isFirstRender.current = false;
        }
    }, [vehicles, map]);

    return null;
};

const MapWrapper = ({ children }: { children: React.ReactNode }) => {
    const defaultCenter: [number, number] = [53.5511, 9.9937];

    return (
        <MapContainer
            center={defaultCenter}
            zoom={12}
            style={{ height: "100%", width: "100%", minHeight: "392px" }}
            data-testid={"vehicle-map-container"}
            aria-label="Vehicle Map"
            keyboard={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
                data-testid={"vehicle-map-tile-layer"}
            />
            {children}
        </MapContainer>
    );
}

const VehiclesMarkers = ({ vehicles }: VehiclesMapProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { selectedVehicleId, setSelectedVehicleId } = useVehicleSelection();

    useEffect(() => {
        if (ref.current) {
            L.DomEvent.disableClickPropagation(ref.current);
        }
    });

    const createCustomIcon = useCallback((isSelected: boolean) => {
        const iconHTML = ReactDOMServer.renderToString(
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: isSelected ? "#003366" : "#0066cc",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                }}
            >
                <CarIcon size={20} color="white" />
            </div>
        );

        return L.divIcon({
            className: "custom-icon",
            html: iconHTML,
            iconSize: [40, 40],
            popupAnchor: [0, -20],
        });
    }, []);

    const markerElements = useMemo(() => {
        return vehicles?.map((vehicle) => (
            <div ref={ref}>
                <Marker
                    key={vehicle.id}
                    position={[vehicle.coordinates[1], vehicle.coordinates[0]]}
                    icon={createCustomIcon(vehicle.id === selectedVehicleId)}
                    eventHandlers={{
                        click: (e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedVehicleId(vehicle.id)
                        },
                    }}
                >
                    <Popup>
                        <strong>{vehicle.licencePlate}</strong>
                        <br />
                        {vehicle.address || "No address"}
                    </Popup>
                </Marker>
            </div>
        ));
    }, [vehicles, selectedVehicleId, setSelectedVehicleId, createCustomIcon]);

    return <>{markerElements}</>;
};

const VehiclesMap = ({ vehicles }: VehiclesMapProps) => (
    <MapWrapper>
        {vehicles && vehicles.length > 0 && <AdjustZoomToFit vehicles={vehicles} />}
        {vehicles && <VehiclesMarkers vehicles={vehicles} />}
    </MapWrapper>
);

export default VehiclesMap;