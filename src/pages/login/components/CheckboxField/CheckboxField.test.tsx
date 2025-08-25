import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CheckboxField } from "./CheckboxField";

describe("CheckboxField", () => {
  const defaultProps = {
    id: "test-checkbox",
    name: "test",
    label: "Test Checkbox",
    defaultChecked: false,
  };

  it("renders checkbox with label", () => {
    render(<CheckboxField {...defaultProps} />);

    expect(screen.getByLabelText("Test Checkbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveAttribute("id", "test-checkbox");
    expect(screen.getByRole("checkbox")).toHaveAttribute("name", "test");
  });

  it("renders unchecked by default when defaultChecked is false", () => {
    render(<CheckboxField {...defaultProps} defaultChecked={false} />);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders checked when defaultChecked is true", () => {
    render(<CheckboxField {...defaultProps} defaultChecked={true} />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("can be toggled by user interaction", async () => {
    const user = userEvent.setup();
    render(<CheckboxField {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("can be toggled by clicking the label", async () => {
    const user = userEvent.setup();
    render(<CheckboxField {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Test Checkbox");

    expect(checkbox).not.toBeChecked();

    await user.click(label);
    expect(checkbox).toBeChecked();
  });

  it("handles disabled state correctly", () => {
    const { rerender } = render(
      <CheckboxField {...defaultProps} disabled={true} />
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();

    rerender(<CheckboxField {...defaultProps} disabled={false} />);
    expect(screen.getByRole("checkbox")).not.toBeDisabled();
  });

  it("renders with required attribute when required is true", () => {
    render(<CheckboxField {...defaultProps} required={true} />);

    expect(screen.getByRole("checkbox")).toBeRequired();
  });

  it("handles custom aria-label", () => {
    render(
      <CheckboxField {...defaultProps} aria-label="Custom checkbox label" />
    );

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-label",
      "Custom checkbox label"
    );
  });

  it("handles custom aria-describedby", () => {
    render(
      <CheckboxField {...defaultProps} aria-describedby="custom-description" />
    );

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-describedby",
      "custom-description"
    );
  });

  it("cannot be toggled when disabled", async () => {
    const user = userEvent.setup();
    render(
      <CheckboxField {...defaultProps} disabled={true} defaultChecked={false} />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("label is properly associated with checkbox", () => {
    render(<CheckboxField {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Test Checkbox");

    expect(label).toHaveAttribute("for", "test-checkbox");
    expect(checkbox).toHaveAttribute("id", "test-checkbox");
  });
});
