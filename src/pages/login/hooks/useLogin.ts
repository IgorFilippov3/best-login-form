import { useCallback, useState } from "react";

import { mockLoginRequest } from "@/api/mock";
import type { LoginRequest, LoginResponse } from "@/types/login";

interface UseLoginReturnType {
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<LoginResponse | undefined>;
  clearError: () => void;
}

export function useLogin(): UseLoginReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: LoginRequest): Promise<LoginResponse | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mockLoginRequest(credentials);

        return result;
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Login failed");
          throw new Error();
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    isLoading,
    error,
    login,
    clearError,
  };
}
