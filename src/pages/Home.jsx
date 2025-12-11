import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatModal from '../components/ChatModal';
import BottomNav from '../components/BottomNav';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const featuredProducts = [
    { id: 1, name: 'Linen Summer Shirt', category: 'Summer Essentials', price: 35.00 },
    { id: 2, name: 'Slim Fit Chinos', category: 'Casual Wear', price: 45.00 },
    { id: 3, name: 'Classic Loafers', category: 'Footwear', price: 89.00 },
    { id: 4, name: 'Straw Hat', category: 'Accessories', price: 25.00 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8 min-h-[calc(100vh-80px)]">
        {/* Hero Banner */}
        <div className="w-full bg-gray-900 rounded-2xl overflow-hidden relative mb-12 text-white">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)'}}></div>
          <div className="relative z-10 px-12 py-20 flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Talk to Your SmartStyle AI Assistant</h1>
            <p className="text-lg text-gray-300 max-w-2xl">Get personalized outfit recommendations instantly based on your mood, occasion, and budget.</p>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-100 transition shadow-lg flex items-center gap-2"
            >
              Start Chatting
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Shop by Category</h3>
            <Link to="/recommendations" className="text-sm font-medium underline">View All</Link>
          </div>
          <div className="flex gap-4 justify-start">
            <button className="px-8 py-3 bg-white border border-gray-200 hover:border-black rounded-full text-sm font-medium transition shadow-sm">Men</button>
            <button className="px-8 py-3 bg-white border border-gray-200 hover:border-black rounded-full text-sm font-medium transition shadow-sm">Women</button>
            <button className="px-8 py-3 bg-white border border-gray-200 hover:border-black rounded-full text-sm font-medium transition shadow-sm">New Arrivals</button>
            <button className="px-8 py-3 bg-white border border-gray-200 hover:border-black rounded-full text-sm font-medium transition shadow-sm">Accessories</button>
            <button className="px-8 py-3 bg-black text-white border border-black rounded-full text-sm font-medium transition shadow-sm">Sale</button>
          </div>
        </div>

        {/* Featured Styles */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-6">Featured Styles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer space-y-3">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden relative">
                  <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium bg-gray-50 group-hover:bg-gray-100 transition">
                    Image
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base">{product.name}</h4>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <p className="font-semibold text-base">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
