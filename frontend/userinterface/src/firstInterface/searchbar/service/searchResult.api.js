import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api/products",
  withCredentials: true,
});
export const searchResult = async ({ search }) => {
  try {
    const response = await api.get("/search", { name: search });
    return response.data;
  } catch (error) {
    console.error(
      "unable to fetch data",
      error.response?.data || error.massage,
    );
  }
};
export const filterByCatagory = async () => {
  try {
    const response =await api.get('/catagory/:catagoryName')
    return response.data
  } catch (error) {
    console.error("unable to fetch data",error)
  }
}
export const catagoryList = async ()=>{
  try {
    const response = await api.get('/catagories')
    return response.data
  } catch (error) {
    console.error("unable to fetch",error)
  }
}
