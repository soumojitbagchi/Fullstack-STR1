import { useContext ,useState} from "react";
import { DashboardContext} from "../dashboard.context";
import {addToCart , getAllCartItems , removeFromCart , orderCheckOut} from "../services/dashBoard.api";

export const useSearch =()=>{
    const context = useContext(DashboardContext)
    const {open , setOpen, loading, setLoading, product, setProduct ,orderList, setOrderList} = context
    if(!context){
        console.log("create a context first ")
    }
    useState(() => {
        
      }, [product] );
    const handleAddToCart = async (productId) => {
        setLoading(true);
        try {
          const message = await addToCart(productId);
          console.log(message);
          // Optionally, you can update the cart state here if needed
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }finally {
          setLoading(false);
        }
      };
    
      const handleGetAllCartItems = async () => {
        setLoading(true);
        try {
          const cartItems = await getAllCartItems();
          console.log(cartItems);
          setProduct(cartItems)
          // Optionally, you can update the cart state here if needed
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }finally {
          setLoading(false);
        }
      };
    
      const handleRemoveFromCart = async (productId) => {
        setLoading(true);
        try {
          const message = await removeFromCart(productId);
          console.log(message);
          setProduct((prevProduct) => prevProduct.filter((item) => item.id !== productId));
          // Optionally, you can update the cart state here if needed
        } catch (error) {
          console.error("Error removing product from cart:", error);
        }finally {
          setLoading(false);
        }
      };
    
      const handleOrderCheckOut = async () => {
        setLoading(true);
        try {
          const orderData = await orderCheckOut();
          console.log(orderData);
          setOrderList(orderData.products || []);
          // Optionally, you can update the cart state here if needed
        } catch (error) {
          console.error("Error placing order:", error);
        }finally {
          setLoading(false);
        }
      };
    return {
        open , loading, setOpen,product, setProduct,
        orderList, setOrderList,
        handleAddToCart,
        handleGetAllCartItems,
        handleRemoveFromCart,
        handleOrderCheckOut
    }
}

export const useDashboard = useSearch;