import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import type { Theme } from "@/types/theme";

import styles from "./ThemeSwitcher.module.css";

type ThemeOption = {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ size: number }>;
};

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "auto", label: "Auto", icon: Monitor },
];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentTheme = THEME_OPTIONS.find((option) => option.value === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={styles.themeSwitcherButton}
        onClick={toggleDropdown}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CurrentIcon size={20} />
      </button>

      {isOpen && (
        <>
          <div
            className={styles.themeSwitcherDropdown}
            role="menu"
            aria-label="Theme options"
          >
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;

              return (
                <button
                  key={option.value}
                  className={`${styles.themeSwitcherOption} ${
                    isActive ? styles.themeSwitcherOptionActive : ""
                  }`}
                  onClick={() => handleThemeSelect(option.value)}
                  role="menuitem"
                  aria-selected={isActive}
                >
                  <Icon size={16} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          <div
            className={styles.themeSwitcherOverlay}
            onClick={closeDropdown}
          />
        </>
      )}
    </div>
  );
};
