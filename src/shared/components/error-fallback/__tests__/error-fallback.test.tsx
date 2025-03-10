import { render, screen, fireEvent } from "@testing-library/react";
import ErrorFallback from "../error-fallback";
import { vi } from "vitest";

describe("Error Fallback Component", () => {
  test("renders error message and retry button", () => {
    const mockRefetch = vi.fn();

    render(<ErrorFallback refetch={mockRefetch} />);

    expect(screen.getByText(/Oops! We’re having trouble connecting./)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();
  });

  test("calls refetch function when retry button is clicked", () => {
    const mockRefetch = vi.fn();

    render(<ErrorFallback refetch={mockRefetch} />);

    const retryButton = screen.getByRole("button", { name: /Try Again/i });
    fireEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  test("disables button and changes text when retrying", () => {
    const mockRefetch = vi.fn();

    render(<ErrorFallback refetch={mockRefetch} />);

    const retryButton = screen.getByRole("button", { name: /Try Again/i });
    fireEvent.click(retryButton);

    expect(retryButton).toBeDisabled();
    expect(retryButton).toHaveTextContent("Retrying...");
  });
});