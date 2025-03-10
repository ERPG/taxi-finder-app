import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { VehicleSelectionProvider, useVehicleSelection } from "../select-vehicle.context";

const TestComponent = () => {
  const { selectedVehicleId, setSelectedVehicleId } = useVehicleSelection();

  return (
    <div>
      <p data-testid="selected-vehicle">{selectedVehicleId ?? "None"}</p>
      <button onClick={() => setSelectedVehicleId(42)}>Select Vehicle 42</button>
    </div>
  );
};

describe("VehicleSelectionContext", () => {
  test("Provides default value of null for selectedVehicleId", () => {
    render(
      <VehicleSelectionProvider>
        <TestComponent />
      </VehicleSelectionProvider>
    );

    expect(screen.getByTestId("selected-vehicle").textContent).toBe("None");
  });

  test("Updates selectedVehicleId when setSelectedVehicleId is called", async () => {
    render(
      <VehicleSelectionProvider>
        <TestComponent />
      </VehicleSelectionProvider>
    );

    const button = screen.getByRole("button", { name: /select vehicle 42/i });

    await userEvent.click(button);

    expect(screen.getByTestId("selected-vehicle").textContent).toBe("42");
  });

  test("Persists state across renders", async () => {
    const { rerender } = render(
      <VehicleSelectionProvider>
        <TestComponent />
      </VehicleSelectionProvider>
    );

    const button = screen.getByRole("button", { name: /select vehicle 42/i });
    await userEvent.click(button);

    rerender(
      <VehicleSelectionProvider>
        <TestComponent />
      </VehicleSelectionProvider>
    );

    expect(screen.getByTestId("selected-vehicle").textContent).toBe("42");
  });
});