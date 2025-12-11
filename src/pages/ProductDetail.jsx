import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import BottomNav from '../components/BottomNav';
import ChatModal from '../components/ChatModal';
import Toast from '../components/Toast';
import { productAPI } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await productAPI.getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

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
      setToast({ message: 'Please select a size', type: 'warning' });
      return;
    }
    
    if (product.stock[selectedSize] === 0) {
      setToast({ message: 'This size is out of stock', type: 'error' });
      return;
    }
    
    addItem(product, selectedSize);
    setToast({ message: `Added ${product.name} to cart!`, type: 'success' });
  };

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
          <div className="bg-gray-100 rounded-lg p-8">
            <div className="aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-9xl">👔</span>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition">
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
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
      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
