import { createContext } from "react";
import { useState } from "react";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false);
  return (
    <DashboardContext.Provider value={{ open, setOpen, loading, setLoading ,setProduct, product }}>
      {children}
    </DashboardContext.Provider>
  );
};
