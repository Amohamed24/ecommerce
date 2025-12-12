import { calculateSubtotal, calculateTax, calculateTotal } from '../cartUtils';

describe('Cart Calculations', () => {
  describe('calculateSubtotal', () => {
    it('should calculate subtotal for single item', () => {
      const items = [{ _id: '1', price: 50 }];
      const quantities = { '1': 2 };

      const result = calculateSubtotal(items, quantities);

      expect(result).toBe(100); // 50 * 2
    });

    it('should calculate subtotal for multiple items', () => {
      const items = [
        { _id: '1', price: 50 },
        { _id: '2', price: 30 },
      ];
      const quantities = { '1': 2, '2': 1 };

      const result = calculateSubtotal(items, quantities);

      expect(result).toBe(130); // (50*2) + (30*1)
    });

    it('should return 0 for empty cart', () => {
      const result = calculateSubtotal([], {});
      expect(result).toBe(0);
    });

    it('should handle items with no quantity (defaults to 1)', () => {
      const items = [{ _id: '1', price: 25 }];
      const quantities = {};

      const result = calculateSubtotal(items, quantities);

      expect(result).toBe(25);
    });
  });

  describe('calculateTax', () => {
    it('should calculate 7% tax correctly', () => {
      const result = calculateTax(100);
      expect(result).toBe(7);
    });

    it('should round tax correctly', () => {
      const result = calculateTax(33.33);
      expect(result).toBe(2.33);
    });

    it('should handle zero subtotal', () => {
      const result = calculateTax(0);
      expect(result).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    it('should add subtotal and tax', () => {
      const result = calculateTotal(100, 7);
      expect(result).toBe(107);
    });
  });
});