import { Label, Pagination, Table, TableCell, TableHeaderCell, TableRow, TableRowSkeleton, TableSortableHeaderCell, Text, useSortBy } from "@freenow/wave";
import { EmojiHappyIcon, EmojiSadIcon } from '@freenow/wave';
import { PaginatedResults } from "../../../../shared/models/pagination";
import { UnifiedVehicle } from "../../models/vehicle";

import styles from './vehicles-table.module.css';
import { useCallback, useMemo } from "react";

import { orderBy } from "lodash";
import { getBatteryIcon } from "./vehicles-table.helper";
import { useVehicleSelection } from "../../contexts/select-vehicle.context";

export type VehiclesTableProps = {
    vehicles: PaginatedResults<UnifiedVehicle[]> | undefined;
    currentPage: number;
    onCurrentPageChange: (id: React.SetStateAction<number>) => void;
    isLoading: boolean;
}

const VehiclesTable = ({ vehicles, isLoading, currentPage, onCurrentPageChange }: VehiclesTableProps) => {
    const lastPage = Math.ceil((vehicles?.totalItems ?? 1) / (vehicles?.pageSize ?? 1));

    const { selectedVehicleId, setSelectedVehicleId } = useVehicleSelection();

    const { sortBy, setSortBy } = useSortBy('licencePlate', 'ASC');

    const handleSortingChange = useCallback(
        (field: string) => {
            console.log();
            setSortBy(field);
        },
        [setSortBy]
    );
    
    const direction = sortBy.direction?.toLowerCase() || 'asc';
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'Many<boolean | "asc" | "desc"> | undefined'.ts(2769)
    const sortedVehicles = orderBy(vehicles?.data, sortBy.field, direction);

    const rows = useMemo(() => {
        return sortedVehicles?.map((vehicle) => (
            <TableRow
                aria-selected={vehicle.id === selectedVehicleId}
                data-testid={"vehicle-row-" + vehicle.id}
                key={vehicle.id}
                onClick={() => setSelectedVehicleId(vehicle.id)}
                active={vehicle.id === selectedVehicleId}
                tabIndex={0}
                role="row"
                aria-label={`Vehicle ${vehicle.licencePlate}, ${vehicle.state}`}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        setSelectedVehicleId(vehicle.id);
                    }
                }}
            >
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.licencePlate}</TableCell>
                <TableCell>{`${vehicle.coordinates[1]}, ${vehicle.coordinates[0]}`}</TableCell>
                <TableCell>{vehicle.address || "-"}</TableCell>
                <TableCell>
                    <Label 
                        variant={vehicle.state === "ACTIVE" ? "success" : "danger"}
                        aria-label={`Vehicle is ${vehicle.state}`} 
                    >
                        {vehicle.state === "ACTIVE" ? "Active" : "Inactive"}
                    </Label>
                </TableCell>
                <TableCell>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {getBatteryIcon(vehicle.fuel)}
                        {vehicle.condition === "GOOD" ? (
                            <div>
                                <EmojiHappyIcon size={18} color="green" aria-label="Good Condition" />
                            </div>
                        ) : (
                            <EmojiSadIcon size={18} color="red" aria-label="Bad Condition" />
                        )}
                    </div>
                </TableCell>
            </TableRow>
        ));
    }, [sortedVehicles, selectedVehicleId, setSelectedVehicleId]);

    return (
        <div data-testid="vehicles-feature">
            <Table rowStyle="zebra" className={styles.table} data-testid="vehicles-table">
                <thead data-testid="vehicles-table-head" aria-label="Vehicles table">
                    <TableRow>
                        <TableHeaderCell scope="col">Type</TableHeaderCell>
                        <TableSortableHeaderCell
                            field="licencePlate"
                            active={sortBy.field === 'licencePlate'}
                            direction={sortBy.direction}
                            onSortChange={handleSortingChange}
                            aria-sort={sortBy.direction === 'ASC' ? 'ascending' : 'descending'}
                            role="columnheader"
                        >
                            Licence Plate
                        </TableSortableHeaderCell>
                        <TableHeaderCell scope="col">Coordinates</TableHeaderCell>
                        <TableHeaderCell scope="col">Address</TableHeaderCell>
                        <TableHeaderCell scope="col">State</TableHeaderCell>
                        <TableHeaderCell scope="col">Condition</TableHeaderCell>
                    </TableRow>
                </thead>
                <tbody>{isLoading ? Array.from({ length: vehicles?.pageSize ?? 1 }, (_, i) => i + 1).map(key => <TableRowSkeleton key={key} columns={6} />) : rows}</tbody>
            </Table>
            {!isLoading ? (
                <div className={styles.paginationContainer} data-testid="vehicles-pagination-container">
                    <Pagination
                        value={currentPage}
                        pageSize={vehicles?.pageSize ?? 1}
                        totalItems={vehicles?.totalItems ?? 1}
                        aria-label="Pagination controls"
                        ariaLabelPrevious="Prev"
                        ariaLabelNext="Next"
                        label={
                            <Text>
                                Page{' '}
                                <Text as="b" fontWeight="semibold">
                                    {currentPage} of {vehicles?.totalPages}
                                </Text>
                            </Text>
                        }
                        onNextPage={() => onCurrentPageChange(current => current + 1)}
                        onPrevPage={() => onCurrentPageChange(current => current - 1)}
                        onSkipForward={() => onCurrentPageChange(lastPage)}
                        onSkipBackward={() => onCurrentPageChange(1)}
                    />
                </div>) : null}
        </div>
    );
};

export default VehiclesTable;