import { fetchProducts } from '../api';

// Set test environment
process.env.NODE_ENV = 'test';
process.env.VITE_API_URL = 'http://localhost:5001';

// Mock fetch globally
global.fetch = jest.fn();

describe('fetchProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    const mockProducts = [
      { _id: '1', title: 'Test Product', price: 99.99 },
      { _id: '2', title: 'Another Product', price: 49.99 },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, products: mockProducts }),
    });

    const result = await fetchProducts();

    expect(result).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchProducts()).rejects.toThrow('Failed to fetch products');
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchProducts()).rejects.toThrow('Network error');
  });
});