import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as mockApi from "@/api/mock";

import { LoginPage } from "./LoginPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/components/ThemeProvider/ThemeProvider", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

vi.mock("@/api/mock", () => ({
  mockLoginRequest: vi.fn(),
}));

const renderLoginPage = () => {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
};

describe("LoginPage", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form elements", () => {
    renderLoginPage();

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember me")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("form has required fields and proper validation setup", async () => {
    renderLoginPage();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    expect(passwordInput).toHaveAttribute("minLength", "4");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls login API with form data when submitted with valid data", async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockResolvedValue({
      data: { user: { id: 1, email: "test@example.com", password: "1234" } },
    });

    renderLoginPage();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "1234");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLoginRequest).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "1234",
        remember: false,
      });
    });
  });

  it("submits form with valid credentials and navigates to success page", async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockResolvedValue({
      data: { user: { id: 1, email: "test@example.com", password: "1234" } },
    });

    renderLoginPage();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "1234");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLoginRequest).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "1234",
        remember: false,
      });
      expect(mockNavigate).toHaveBeenCalledWith("/success");
    });
  });

  it("submits form with remember me checked", async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockResolvedValue({
      data: { user: { id: 1, email: "test@example.com", password: "1234" } },
    });

    renderLoginPage();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const rememberCheckbox = screen.getByLabelText("Remember me");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "1234");
    await user.click(rememberCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLoginRequest).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "1234",
        remember: true,
      });
    });
  });

  it("displays loading state during form submission", async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderLoginPage();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "1234");
    await user.click(submitButton);

    expect(screen.getByText("Signing In...")).toBeInTheDocument();
    expect(
      screen.getByText("Please wait while we sign you in...")
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(screen.getByLabelText("Remember me")).toBeDisabled();
  });

  it("displays API error when login fails", async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);
    mockLoginRequest.mockRejectedValue(new Error("Invalid credentials"));

    renderLoginPage();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrong");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("clears API error when form is resubmitted", async () => {
    const mockLoginRequest = vi.mocked(mockApi.mockLoginRequest);

    mockLoginRequest.mockRejectedValueOnce(new Error("Invalid credentials"));

    renderLoginPage();

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrong");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    mockLoginRequest.mockResolvedValue({
      data: { user: { id: 1, email: "test@example.com", password: "1234" } },
    });

    await user.clear(passwordInput);
    await user.type(passwordInput, "1234");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();
    });
  });

  it("renders app title and logo", () => {
    renderLoginPage();

    expect(screen.getByText("Best Login Form")).toBeInTheDocument();
  });
});
