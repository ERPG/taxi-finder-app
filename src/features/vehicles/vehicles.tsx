import { Suspense, useState } from "react";
import useErrorBoundary from "../../shared/components/error-boundary/error-boundary";
import VehiclesTable from "./components/vehicles-table/vehicles-table";
import VehiclesMap from "./components/vehicles-map/vehicles-map";
import { useVehicles } from "./hooks/use-vehicles";

import styles from "./vehicles.module.css";
import { PAGE_LIMIT } from "../../shared/utils/constants";
import ErrorFallback from "@/shared/components/error-fallback/error-fallback";
import { VehicleSelectionProvider } from "./contexts/select-vehicle.context";

const VehiclesFeature = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { ErrorBoundaryWrapper } = useErrorBoundary();

    const { data: vehicles, isLoading, isError, refetch } = useVehicles(PAGE_LIMIT, currentPage);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <ErrorFallback refetch={refetch} />;

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    return (
        <ErrorBoundaryWrapper>
            <Suspense fallback={<div>Loading vehicles...</div>}>
                <VehicleSelectionProvider>
                    <div className={styles.container}>
                        <div className={styles.mapContainer}>
                            <VehiclesMap vehicles={vehicles?.data} />
                        </div>
                        <div className={styles.tableContainer}>
                            <VehiclesTable
                                vehicles={vehicles}
                                currentPage={currentPage}
                                onCurrentPageChange={handlePageChange}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </VehicleSelectionProvider>
            </Suspense>
        </ErrorBoundaryWrapper>
    );
};

export default VehiclesFeature;
