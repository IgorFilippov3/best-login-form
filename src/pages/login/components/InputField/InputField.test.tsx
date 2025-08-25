import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InputField } from "./InputField";

describe("InputField", () => {
  const defaultProps = {
    id: "test-input",
    name: "test",
    label: "Test Label",
  };

  it("renders input field with label", () => {
    render(<InputField {...defaultProps} />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "test-input");
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "test");
  });

  it("renders with default text type", () => {
    render(<InputField {...defaultProps} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("renders with specified type", () => {
    render(<InputField {...defaultProps} type="email" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("renders password input correctly", () => {
    render(<InputField {...defaultProps} type="password" />);

    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders with placeholder", () => {
    render(<InputField {...defaultProps} placeholder="Enter text here" />);

    expect(screen.getByPlaceholderText("Enter text here")).toBeInTheDocument();
  });

  it("renders with default value", () => {
    render(<InputField {...defaultProps} defaultValue="default text" />);

    expect(screen.getByDisplayValue("default text")).toBeInTheDocument();
  });

  it("renders with required attribute", () => {
    render(<InputField {...defaultProps} required />);

    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("renders with length constraints", () => {
    render(<InputField {...defaultProps} minLength={4} maxLength={10} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("minLength", "4");
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("renders error message when error prop is provided", () => {
    render(<InputField {...defaultProps} error="This field is required" />);

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("role", "alert");
    expect(errorMessage).toHaveAttribute("aria-live", "polite");
  });

  it("sets aria-invalid when error is present", () => {
    render(<InputField {...defaultProps} error="This field is required" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when no error", () => {
    render(<InputField {...defaultProps} />);

    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("links error message with input via aria-describedby", () => {
    render(<InputField {...defaultProps} error="This field is required" />);

    const input = screen.getByRole("textbox");
    const errorMessage = screen.getByText("This field is required");

    expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining(errorMessage.id)
    );
    expect(errorMessage).toHaveAttribute("id", "test-input-error");
  });

  it("handles custom aria-label", () => {
    render(<InputField {...defaultProps} aria-label="Custom label" />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-label",
      "Custom label"
    );
  });

  it("handles custom aria-describedby", () => {
    render(
      <InputField {...defaultProps} aria-describedby="custom-description" />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("custom-description")
    );
  });

  it("combines custom aria-describedby with error id", () => {
    render(
      <InputField
        {...defaultProps}
        aria-describedby="custom-description"
        error="Error message"
      />
    );

    const input = screen.getByRole("textbox");
    const describedBy = input.getAttribute("aria-describedby");

    expect(describedBy).toContain("custom-description");
    expect(describedBy).toContain("test-input-error");
  });

  it("does not render error message when no error", () => {
    render(<InputField {...defaultProps} />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
