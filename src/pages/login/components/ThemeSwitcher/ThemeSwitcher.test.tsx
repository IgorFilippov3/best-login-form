import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeSwitcher } from "./ThemeSwitcher";

let mockTheme = "light";
const mockSetTheme = vi.fn();

vi.mock("@/components/ThemeProvider/ThemeProvider", () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme = "light"; // сброс темы перед каждым тестом
  });

  it("renders theme switcher button", () => {
    render(<ThemeSwitcher />);

    expect(screen.getByLabelText("Toggle theme")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle theme" })
    ).toBeInTheDocument();
  });

  it("shows dropdown when button is clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("Auto")).toBeInTheDocument();
  });

  it("has correct ARIA attributes for button", () => {
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-haspopup", "true");
  });

  it("updates aria-expanded when dropdown is opened", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("calls setTheme when theme option is selected", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    const darkOption = screen.getByText("Dark");
    await user.click(darkOption);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("closes dropdown when theme option is selected", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    const darkOption = screen.getByText("Dark");
    await user.click(darkOption);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes dropdown when overlay is clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    const overlay = document.querySelector('[class*="themeSwitcherOverlay"]');
    expect(overlay).toBeInTheDocument();

    if (overlay) {
      await user.click(overlay);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    }
  });

  it("renders menu items with correct ARIA attributes", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    const lightOption = screen.getByText("Light").closest("button");
    const darkOption = screen.getByText("Dark").closest("button");
    const autoOption = screen.getByText("Auto").closest("button");

    expect(lightOption).toHaveAttribute("role", "menuitem");
    expect(darkOption).toHaveAttribute("role", "menuitem");
    expect(autoOption).toHaveAttribute("role", "menuitem");

    expect(lightOption).toHaveAttribute("aria-selected", "true");
    expect(darkOption).toHaveAttribute("aria-selected", "false");
    expect(autoOption).toHaveAttribute("aria-selected", "false");
  });

  it("shows correct active theme option for light theme", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    const lightOption = screen.getByText("Light").closest("button");
    expect(lightOption).toHaveAttribute("aria-selected", "true");
  });

  it("shows correct active theme option for dark theme", async () => {
    mockTheme = "dark";

    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    const darkOption = screen.getByText("Dark").closest("button");
    expect(darkOption).toHaveAttribute("aria-selected", "true");
  });

  it("shows correct active theme option for auto theme", async () => {
    mockTheme = "auto";

    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    const button = screen.getByLabelText("Toggle theme");
    await user.click(button);

    const autoOption = screen.getByText("Auto").closest("button");
    expect(autoOption).toHaveAttribute("aria-selected", "true");
  });

  it("displays correct icon for each theme", () => {
    mockTheme = "light";
    const { rerender } = render(<ThemeSwitcher />);
    let button = screen.getByLabelText("Toggle theme");
    expect(button.querySelector("svg")).toBeInTheDocument();

    mockTheme = "dark";
    rerender(<ThemeSwitcher />);
    button = screen.getByLabelText("Toggle theme");
    expect(button.querySelector("svg")).toBeInTheDocument();

    mockTheme = "auto";
    rerender(<ThemeSwitcher />);
    button = screen.getByLabelText("Toggle theme");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
