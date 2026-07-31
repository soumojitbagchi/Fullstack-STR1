import { createContext } from "react";
import { useState } from "react";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([])
  return (
    <DashboardContext.Provider value={{ open, setOpen, loading, setLoading ,setProduct, product ,orderList, setOrderList}}>
      {children}
    </DashboardContext.Provider>
  );
};
