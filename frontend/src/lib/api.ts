import { getApiUrl } from '../config/env';

const API_URL = getApiUrl();

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/product/list`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};