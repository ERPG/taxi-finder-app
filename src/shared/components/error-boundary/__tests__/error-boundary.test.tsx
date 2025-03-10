import { fireEvent, render, screen } from "@testing-library/react";
import useErrorBoundary from "../error-boundary";
import { useEffect } from "react";

function TestComponent({ triggerError }: { triggerError?: boolean }) {
  const { ErrorBoundaryWrapper, handleError } = useErrorBoundary();


  useEffect(() => {
    if (triggerError) {
      handleError(new Error("Test error"));
    }
  }, [triggerError]);

  return (
    <ErrorBoundaryWrapper>
      <div data-testid="child-component">Normal Content</div>
    </ErrorBoundaryWrapper>
  );
}

describe("useErrorBoundary hook", () => {
  test("should render children when no error occurs", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("child-component")).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong:/)).not.toBeInTheDocument();
  });

  test("should display fallback UI when an error occurs", () => {
    render(<TestComponent triggerError={true} />);

    expect(screen.getByText(/Something went wrong: Test error/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();
  });

  test("should reset error boundary when 'Try Again' is clicked", () => {
    render(<TestComponent triggerError={true} />);

    expect(screen.getByText(/Something went wrong:/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Try Again/i }));

    expect(screen.queryByText(/Something went wrong:/)).not.toBeInTheDocument();
    expect(screen.getByTestId("child-component")).toBeInTheDocument();
  });
});