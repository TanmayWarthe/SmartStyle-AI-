import { create } from 'zustand';

export const useSessionStore = create((set) => ({
  messages: [],
  recommendations: [],
  
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, { ...message, timestamp: Date.now() }]
    }));
  },
  
  setRecommendations: (products) => {
    set({ recommendations: products });
  },
  
  clearSession: () => {
    set({ messages: [], recommendations: [] });
  },
  
  initDemoMode: () => {
    set({
      messages: [
        {
          type: 'user',
          text: 'I want a black jacket',
          timestamp: Date.now() - 5000
        },
        {
          type: 'ai',
          text: 'Great choice! Here are some black jackets I recommend for you:',
          timestamp: Date.now() - 4000
        }
      ]
    });
  }
}));
