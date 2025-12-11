import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import CartSummary from '../components/CartSummary';
import BottomNav from '../components/BottomNav';
import ChatModal from '../components/ChatModal';
import Toast from '../components/Toast';

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  
  const [address, setAddress] = useState('123 Main Street, City, State - 123456');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loyaltyApplied, setLoyaltyApplied] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleCheckout = () => {
    if (items.length === 0) {
      setToast({ message: 'Your cart is empty!', type: 'warning' });
      return;
    }
    
    if (!address.trim()) {
      setToast({ message: 'Please enter delivery address', type: 'warning' });
      return;
    }
    
    // Simulate processing
    const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    setTimeout(() => {
      navigate('/confirmation', { state: { orderId } });
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-black mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
        <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                <div className="w-24 h-24 bg-brand-light rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">👔</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-black font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Size: {item.size} • Color: White</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 text-gray-600 hover:text-black"
                      >
                        -
                      </button>
                      <span className="text-black w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 text-gray-600 hover:text-black"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-gray-400 hover:text-black"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-black font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-black mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-black">₹{useCartStore.getState().getTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-black">₹{(5).toLocaleString('en-IN')}</span>
                </div>
                {loyaltyApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{(useCartStore.getState().getTotal() * 0.1).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between text-lg font-bold mb-6">
                <span className="text-black">Total</span>
                <span className="text-black">
                  ₹{((useCartStore.getState().getTotal() + 5) * (loyaltyApplied ? 0.9 : 1)).toLocaleString('en-IN')}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition mb-3"
              >
                Checkout
              </button>
              
              <button className="w-full text-center text-sm text-gray-600 hover:text-black flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </button>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-black text-sm font-medium rounded hover:bg-gray-200">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
