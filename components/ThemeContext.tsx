import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "classified" | "public";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isPublic: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("classified");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "classified" ? "public" : "classified"));
  };

  // Apply dark class to document for Tailwind dark mode
  useEffect(() => {
    if (theme === "classified") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isPublic: theme === "public" }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
