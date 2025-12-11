import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import productsData from '../data/products.json';
import BottomNav from '../components/BottomNav';
import ChatModal from '../components/ChatModal';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  
  const product = productsData.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-black mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (product.stock[selectedSize] === 0) {
      alert('This size is out of stock');
      return;
    }
    
    addItem(product, selectedSize);
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  // Get matching products for styling suggestions
  const suggestions = productsData
    .filter(p => p.id !== product.id && p.category !== product.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-brand-light rounded-lg p-8">
            <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
              <span className="text-9xl">👔</span>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-gray-500 text-sm font-medium">{product.category}</span>
            <h1 className="text-4xl font-bold text-black mt-2 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="text-3xl font-bold text-black mb-8">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <label className="block text-black font-semibold mb-3">Select Size</label>
              <div className="flex gap-3">
                {product.sizes.map(size => {
                  const inStock = product.stock[size] > 0;
                  return (
                    <button
                      key={size}
                      onClick={() => inStock && setSelectedSize(size)}
                      disabled={!inStock}
                      className={`px-6 py-3 rounded-md font-medium transition ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : inStock
                          ? 'bg-white text-black border border-gray-300 hover:border-black'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-md font-semibold text-lg hover:bg-gray-800 transition mb-4"
            >
              Add to Cart
            </button>
            
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const aiButton = document.querySelector('[data-ai-assistant]');
                  if (aiButton) aiButton.click();
                }, 100);
              }}
              className="w-full bg-white text-black py-4 rounded-md font-semibold border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              Ask AI Assistant
            </button>
          </div>
        </div>

        {/* AI Styling Suggestions */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-6">Complete the Look</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map(product => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6 flex gap-4 hover:shadow-lg transition">
                <div className="w-24 h-24 bg-brand-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">👔</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-black font-semibold mb-2">{product.name}</h3>
                  <p className="text-black font-bold mb-3">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="text-sm text-gray-600 hover:text-black font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
