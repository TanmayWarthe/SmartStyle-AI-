import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (product, size) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({
        items: [...items, { ...product, size, quantity: 1 }]
      });
    }
  },
  
  removeItem: (productId, size) => {
    set({
      items: get().items.filter(item => !(item.id === productId && item.size === size))
    });
  },
  
  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
    } else {
      set({
        items: get().items.map(item =>
          item.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      });
    }
  },
  
  clearCart: () => set({ items: [] }),
  
  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));
