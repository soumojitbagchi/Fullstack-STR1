import apiClient from '../../api/apiClient';

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/products/catagories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    return ['outerwear', 'shoes', 'tops', 'bottoms', 'accessories'];
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/catagory/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category from API:', error);
    return [];
  }
};
