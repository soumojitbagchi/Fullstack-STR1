import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api/products",
  withCredentials: true,
});
export const searchResult = async ({ name }) => {
  try {
    const response = await api.get("/search", { params: { name } });
    return response.data;
  } catch (err) {
    console.error("unable to fetch data", err.response?.data || err.massage);
    return err
  }
};
export const filterByCatagory = async () => {
  try {
    const response = await api.get("/catagory/:catagoryName");
    return response.data;
  } catch (err) {
    console.error("unable to fetch data", err);
    return err
  }
};
export const catagoryList = async () => {
  try {
    const response = await api.get("/catagories");
    return response.data;
  } catch (err) {
    console.error("unable to fetch", err);
    return err
  }
};
