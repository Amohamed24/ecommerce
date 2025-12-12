

export const calculateSubtotal = (items: any[], quantities: { [key: string]: number }) => {
  return items.reduce((total, item) => {
    const itemId = item._id || item.id;
    const qty = itemId ? quantities[itemId] || 1 : 1;
    const price = Number(item.price) || 0;
    return total + (price * qty);
  }, 0);
};

export const calculateTax = (subtotal: number, taxRate: number = 0.07) => {
  return Math.floor(subtotal * taxRate * 100) / 100;
};

export const calculateTotal = (subtotal: number, tax: number) => {
  return subtotal + tax;
};