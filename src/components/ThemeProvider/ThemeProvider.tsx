import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Theme } from "@/types/theme";

/**
 * Context value shape for ThemeProvider
 */
type ThemeContextValue = {
  theme: Theme;
  effectiveTheme: Exclude<Theme, "auto">;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  themes: readonly Theme[];
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Custom hook to access the ThemeContext
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

const THEMES: Theme[] = ["light", "dark", "auto"] as const;

/**
 * Safely read system color scheme
 * @returns "dark" or "light" depending on system preference
 */
const getSystemTheme = (): Exclude<Theme, "auto"> => {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
};

/**
 * Safely read stored theme from localStorage
 * @returns stored theme or "auto" as fallback
 */
const readStoredTheme = (): Theme => {
  try {
    return (localStorage.getItem("theme") as Theme | null) ?? "auto";
  } catch {
    return "auto";
  }
};

/**
 * Apply theme to <html> element using data-theme attribute
 * @param t theme to apply
 */
const applyDomTheme = (t: Theme): void => {
  const root = document.documentElement;
  if (t === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", t);
  }
};

/**
 * Provides theme context with persistence and system preference support
 */
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  const effectiveTheme: "light" | "dark" = useMemo<
    Exclude<Theme, "auto">
  >(() => {
    return theme === "auto" ? getSystemTheme() : theme;
  }, [theme]);

  const setThemeWithStorage = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch {
      // Ignore failures (e.g. Safari private mode)
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeWithStorage(effectiveTheme === "light" ? "dark" : "light");
  }, [effectiveTheme, setThemeWithStorage]);

  useEffect(() => {
    applyDomTheme(theme === "auto" ? "auto" : effectiveTheme);
  }, [theme, effectiveTheme]);

  useEffect(() => {
    if (theme !== "auto") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (): void => applyDomTheme("auto");

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
  }, [theme]);

  const value: ThemeContextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      effectiveTheme,
      setTheme: setThemeWithStorage,
      toggleTheme,
      themes: THEMES,
    }),
    [theme, effectiveTheme, setThemeWithStorage, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
