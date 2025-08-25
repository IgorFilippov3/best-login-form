import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SuccessPage } from "./SuccessPage";

const mockAddConfetti = vi.fn();
const mockClearCanvas = vi.fn();

vi.mock("js-confetti", () => ({
  default: vi.fn().mockImplementation(() => ({
    addConfetti: mockAddConfetti,
    clearCanvas: mockClearCanvas,
  })),
}));

vi.mock("../login/components/ThemeSwitcher/ThemeSwitcher", () => ({
  ThemeSwitcher: () => <button>Theme Switcher</button>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SuccessPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders success page content", () => {
    renderWithRouter(<SuccessPage />);

    expect(
      screen.getByRole("heading", { name: "Success!" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("You have successfully logged in! 🎉")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to login/i })
    ).toBeInTheDocument();
  });

  it("renders back to login link with correct href", () => {
    renderWithRouter(<SuccessPage />);

    const backLink = screen.getByRole("link", { name: /back to login/i });
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("renders theme switcher", () => {
    renderWithRouter(<SuccessPage />);

    expect(screen.getByText("Theme Switcher")).toBeInTheDocument();
  });

  it("renders check circle icon with correct attributes", () => {
    renderWithRouter(<SuccessPage />);

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("renders main content within main landmark", () => {
    renderWithRouter(<SuccessPage />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    const title = screen.getByRole("heading", { name: "Success!" });
    expect(main).toContainElement(title);
  });

  it("triggers confetti after 1500ms delay", async () => {
    renderWithRouter(<SuccessPage />);

    expect(mockAddConfetti).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(mockAddConfetti).toHaveBeenCalledTimes(1);
    });
  });

  it("calls confetti with correct configuration", async () => {
    renderWithRouter(<SuccessPage />);

    vi.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(mockAddConfetti).toHaveBeenCalledWith({
        confettiColors: [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#96ceb4",
          "#ffeaa7",
          "#dda0dd",
          "#f39c12",
          "#e74c3c",
          "#9b59b6",
        ],
        confettiRadius: 6,
        confettiNumber: 150,
      });
    });
  });

  it("does not trigger confetti before timeout", () => {
    renderWithRouter(<SuccessPage />);

    vi.advanceTimersByTime(1000);

    expect(mockAddConfetti).not.toHaveBeenCalled();
  });

  it("clears canvas on component unmount", () => {
    const { unmount } = renderWithRouter(<SuccessPage />);

    unmount();

    expect(mockClearCanvas).toHaveBeenCalledTimes(1);
  });

  it("clears timeout on component unmount before confetti triggers", () => {
    const { unmount } = renderWithRouter(<SuccessPage />);

    unmount();

    vi.advanceTimersByTime(2000);

    expect(mockAddConfetti).not.toHaveBeenCalled();
    expect(mockClearCanvas).toHaveBeenCalledTimes(1);
  });

  it("has correct page structure", () => {
    renderWithRouter(<SuccessPage />);

    const pageContainer = screen.getByRole("main").parentElement;
    expect(pageContainer).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /back to login/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Theme Switcher")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Success!" })
    ).toBeInTheDocument();
  });

  it("renders with accessible content", () => {
    renderWithRouter(<SuccessPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Success!"
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to login/i })
    ).toBeInTheDocument();

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("creates new JSConfetti instance on mount", async () => {
    const JSConfetti = vi.mocked(await import("js-confetti")).default;

    renderWithRouter(<SuccessPage />);

    expect(JSConfetti).toHaveBeenCalledTimes(1);
  });
});
