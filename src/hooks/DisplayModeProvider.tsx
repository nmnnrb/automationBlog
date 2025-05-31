"use client"; // Needed since this uses hooks

import React, { createContext, useState, useContext, ReactNode } from "react";

// 1. Define the context type (optional, but good for TypeScript)
type DisplayModeContextType = {
  mode: "light" | "dark";
  toggleMode: () => void;
  colorSchema: {
    bgColor: string;
    textColor: string;
  };
};

// 2. Create context
const DisplayMode = createContext<DisplayModeContextType | undefined>(undefined);

// 3. Provider component
export const DisplayModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("displayMode");
      if (stored === "light" || stored === "dark") return stored;
    }
    return "light";
  });
  

  const [editAdmin, setEditAdmin] = useState(true);
  const toggleEditAdmin = () => {

    setEditAdmin((prev) => !prev);
  }



  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("displayMode", mode);
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colorSchema = {
    bgColor: mode === "light" ? "#ffffff" : "#000000",
    textColor: mode === "light" ? "#000000" : "#ffffff",
  };

  return (
    <DisplayMode.Provider value={{ mode, toggleMode, colorSchema, editAdmin , toggleEditAdmin }}>
      {children}
    </DisplayMode.Provider>
  );
};

export const useDisplayMode = () => {
  const context = useContext(DisplayMode);
  if (!context) {
    throw new Error("useDisplayMode must be used within a DisplayModeProvider");
  }
  return context;
};
