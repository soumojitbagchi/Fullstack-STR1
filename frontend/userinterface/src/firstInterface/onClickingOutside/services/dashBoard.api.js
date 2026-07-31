import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const getAllCartItems = async () => {
  try {
    const response = await api.get("/user/cart");
    return response.data.cart;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

const addToCart = async (productId) => {
  try {
    const response = await api.post(`/user/cart/${productId}`);
    return response.data.message;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/user/cart/${productId}`);
    return response.data.message;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

const orderCheckOut = async () => {
  try {
    const response = await api.post("/user/order-checkout");
    return response.data.order;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export { getAllCartItems, addToCart, removeFromCart, orderCheckOut };