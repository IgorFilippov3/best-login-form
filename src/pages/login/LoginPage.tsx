import { CodeXml, Loader2 } from "lucide-react";
import { type ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { extractZodErrors } from "@/utils/extract-zod-errors";

import { ApiAlert } from "./components/ApiAlert/ApiAlert";
import { CheckboxField } from "./components/CheckboxField/CheckboxField";
import { InputField } from "./components/InputField/InputField";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import { useLogin } from "./hooks/useLogin";

import styles from "./LoginPage.module.css";

type FormErrors = {
  email?: string;
  password?: string;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email can't be blank")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password can't be blank")
    .min(4, "Password must be at least 4 characters"),

  remember: z.boolean().optional(),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const { login, isLoading, error: apiError, clearError } = useLogin();

  const handleFormSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      clearError();

      const formData = new FormData(e.currentTarget);

      const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
        remember: formData.get("remember") === "on",
      };

      try {
        const validatedData = formSchema.parse(rawData);
        setErrors({});

        await login(validatedData);

        navigate("/success");
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(extractZodErrors<FormErrors>(error));
        }
      }
    },
    [login, clearError, navigate]
  );

  return (
    <div className={styles.pageContainer}>
      <main className={styles.formSection}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.logo}>
              <CodeXml />
            </div>
            <div className={styles.appTitle}>Best Login Form</div>
          </div>
          <div className={styles.headerRight}>
            <ThemeSwitcher />
          </div>
        </header>
        <div className={styles.mainContent}>
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Sign in to your account</h1>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <ApiAlert error={apiError} onDismiss={clearError} />
              <InputField
                id="request-email"
                name="email"
                label="Email"
                placeholder="example@youremail.com"
                type="email"
                required
                error={errors.email}
              />
              <InputField
                id="request-password"
                name="password"
                label="Password"
                placeholder="your password"
                type="password"
                required
                minLength={4}
                error={errors.password}
              />
              <div className={styles.checkboxWrapper}>
                <CheckboxField
                  id="request-remember"
                  name="remember"
                  label="Remember me"
                  defaultChecked={false}
                  disabled={isLoading}
                />
              </div>
              <div>
                <button
                  className={`${styles.submitButton} ${
                    isLoading ? styles.submitButtonLoading : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                  aria-describedby={isLoading ? "loading-status" : undefined}
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        size={16}
                        className={styles.loadingSpinner}
                        aria-hidden="true"
                      />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {isLoading && (
                  <div
                    id="loading-status"
                    className={styles.loadingMessage}
                    aria-live="polite"
                    role="status"
                  >
                    Please wait while we sign you in...
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
