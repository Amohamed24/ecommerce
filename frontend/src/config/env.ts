
export const getApiUrl = (): string => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return process.env.VITE_API_URL || 'http://localhost:5001';
  }
  

  if (typeof window !== 'undefined') {
    return (window as any).__VITE_API_URL__ || 'http://localhost:5001';
  }
  
  return 'http://localhost:5001';
};