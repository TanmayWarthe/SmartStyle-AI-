import { Link, useLocation } from 'react-router-dom';

export default function BottomNav({ onChatOpen, isChatOpen }) {
  const location = useLocation();
  
  const getActiveScreen = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/chat') return 'chat';
    if (location.pathname === '/recommendations') return 'shop';
    if (location.pathname.startsWith('/product')) return 'product';
    if (location.pathname === '/checkout') return 'cart';
    // if (location.pathname === '/confirmation') return 'done';
    return 'home';
  };

  const activeScreen = getActiveScreen();

  // Hide bottom nav when chat is open
  if (isChatOpen) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur border border-gray-200 p-2 rounded-full shadow-2xl flex gap-2 z-50">
      <Link 
        to="/" 
        className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
          activeScreen === 'home' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Home
      </Link>
      <button 
        onClick={onChatOpen}
        className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
          activeScreen === 'chat' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Chat
      </button>
      <Link 
        to="/recommendations" 
        className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
          activeScreen === 'shop' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Shop
      </Link>
      <Link 
        to="/product/1" 
        className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
          activeScreen === 'product' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Product
      </Link>
      <Link 
        to="/checkout" 
        className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
          activeScreen === 'cart' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Cart
      </Link>
      <Link 
        to="/confirmation" 
        className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
          activeScreen === 'done' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Done
      </Link>
    </div>
  );
}
