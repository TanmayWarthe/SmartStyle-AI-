import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartStore } from '../context/CartContext';
import BottomNav from '../components/BottomNav';
import ChatModal from '../components/ChatModal';

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const clearCart = useCartStore(state => state.clearCart);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const orderId = location.state?.orderId || 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 fade-in">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-black mb-4 fade-in">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg mb-8 fade-in">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order ID */}
        <div className="bg-brand-light p-6 rounded-lg mb-8 fade-in">
          <p className="text-gray-600 mb-2">Order ID</p>
          <p className="text-black text-2xl font-bold font-mono">{orderId}</p>
        </div>

        {/* Order Details */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8 text-left fade-in">
          <h2 className="text-xl font-bold text-black mb-4">What's Next?</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-green-600">✓</span>
              <span>You'll receive an order confirmation email shortly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600">✓</span>
              <span>Your order will be processed within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600">✓</span>
              <span>Estimated delivery: 3-5 business days</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600">✓</span>
              <span>Track your order using the Order ID above</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center fade-in">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => alert(`Tracking order ${orderId}...`)}
            className="px-8 py-3 bg-white text-black border border-gray-300 rounded-md font-semibold hover:bg-gray-50 transition"
          >
            Track Order
          </button>
        </div>

        {/* Chat Option */}
        <div className="mt-8 fade-in">
          <p className="text-gray-600 mb-3">Need help with your order?</p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="text-black hover:underline font-semibold"
          >
            Chat with SmartStyle AI
          </button>
        </div>
      </div>
      
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
