import { getApiUrl } from '../config/env';

const API_URL = getApiUrl();

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/product/list`);
    
    if (!response.ok) {
      throw new ApiError(
        'Failed to fetch products',
        response.status,
        await response.text()
      );
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new ApiError('API returned unsuccessful response', undefined, data);
    }
    
    return data.products;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('API Error:', error.message, error.statusCode);
      throw error;
    }
    
    // Network error or other unexpected error
    console.error('Network or unexpected error:', error);
    throw new ApiError('Network error - please check your connection');
  }
};