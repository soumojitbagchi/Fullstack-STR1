import { createContext } from "react";
import { useState } from "react";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <DashboardContext.Provider value={{ open, setOpen }}>
      {children}
    </DashboardContext.Provider>
  );
};
