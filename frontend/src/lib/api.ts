const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/product/list`);
    const data = await response.json();
    
    if (data.success) {
      return data.products;
    }
    throw new Error('Failed to fetch products');
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};