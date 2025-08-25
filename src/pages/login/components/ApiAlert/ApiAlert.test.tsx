import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ApiAlert } from "./ApiAlert";

vi.mock("@/utils/formatApiError", () => ({
  formatApiError: vi.fn((error: string) => error),
}));

describe("ApiAlert", () => {
  it("renders nothing when error is null", () => {
    const { container } = render(<ApiAlert error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders error message when error is provided", () => {
    render(<ApiAlert error="Something went wrong" />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("has correct ARIA attributes", () => {
    render(<ApiAlert error="Test error" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("aria-live", "assertive");
    expect(alert).toHaveAttribute("tabIndex", "-1");
  });

  it("focuses the alert when error appears", () => {
    render(<ApiAlert error="Test error" />);

    const alert = screen.getByRole("alert");
    expect(document.activeElement).toBe(alert);
  });

  it("renders dismiss button when onDismiss is provided", () => {
    const onDismiss = vi.fn();
    render(<ApiAlert error="Test error" onDismiss={onDismiss} />);

    expect(screen.getByLabelText("Dismiss error message")).toBeInTheDocument();
  });

  it("does not render dismiss button when onDismiss is not provided", () => {
    render(<ApiAlert error="Test error" />);

    expect(
      screen.queryByLabelText("Dismiss error message")
    ).not.toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<ApiAlert error="Test error" onDismiss={onDismiss} />);

    const dismissButton = screen.getByLabelText("Dismiss error message");
    await user.click(dismissButton);

    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("renders alert icon", () => {
    render(<ApiAlert error="Test error" />);

    const icon = screen
      .getByRole("alert")
      .querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });

  it("updates focus when error changes", () => {
    const { rerender } = render(<ApiAlert error="First error" />);

    const firstAlert = screen.getByRole("alert");
    expect(document.activeElement).toBe(firstAlert);

    rerender(<ApiAlert error="Second error" />);

    const secondAlert = screen.getByRole("alert");
    expect(document.activeElement).toBe(secondAlert);
  });

  it("does not focus when component mounts without error", () => {
    render(<ApiAlert error={null} />);
    expect(document.activeElement).toBe(document.body);
  });
});
