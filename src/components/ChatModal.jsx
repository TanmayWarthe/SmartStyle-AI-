import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import { useSessionStore } from '../context/SessionContext';
import { useCartStore } from '../context/CartContext';
import productsData from '../data/products.json';

export default function ChatModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({});
  const messagesEndRef = useRef(null);
  
  const messages = useSessionStore(state => state.messages);
  const recommendations = useSessionStore(state => state.recommendations);
  const addMessage = useSessionStore(state => state.addMessage);
  const setRecommendations = useSessionStore(state => state.setRecommendations);
  const addItem = useCartStore(state => state.addItem);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, recommendations]);

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerMessage = userMessage.toLowerCase();
      
      // Multi-intent detection with context
      if (lowerMessage.includes('jacket') || lowerMessage.includes('leather') || lowerMessage.includes('black jacket')) {
        addMessage({
          type: 'ai',
          text: '👔 Great choice! I found some stylish jackets that would look amazing on you. These are our bestsellers:'
        });
        setRecommendations([productsData[0], productsData[3]]);
        setConversationContext({ lastCategory: 'jackets', preference: 'leather' });
      } else if (lowerMessage.includes('beach') || lowerMessage.includes('wedding') || lowerMessage.includes('casual') || lowerMessage.includes('summer')) {
        addMessage({
          type: 'ai',
          text: '🌴 A casual beach wedding sounds lovely! For comfort and style, I recommend breathable fabrics like linen or light cotton. Here are three complete looks I\'ve curated:'
        });
        setRecommendations([productsData[1], productsData[2], productsData[4]]);
        setConversationContext({ occasion: 'beach wedding', style: 'casual' });
      } else if (lowerMessage.includes('shirt') || lowerMessage.includes('white') || lowerMessage.includes('formal')) {
        addMessage({
          type: 'ai',
          text: '👔 Perfect! These elegant shirts are ideal for a polished, professional look. All are made from premium materials:'
        });
        setRecommendations([productsData[1], productsData[5]]);
        setConversationContext({ lastCategory: 'shirts', style: 'formal' });
      } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
        addMessage({
          type: 'ai',
          text: '🚀 I\'m your AI shopping assistant! Here\'s what I can help you with:\n\n• Find outfits for any occasion\n• Recommend items by size, color, or price\n• Track your orders and deliveries\n• Check product availability\n• Style advice and outfit combinations\n\nJust tell me what you\'re looking for!'
        });
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cheap') || lowerMessage.includes('budget') || lowerMessage.includes('affordable')) {
        const affordable = productsData.filter(p => p.price < 3000).slice(0, 3);
        addMessage({
          type: 'ai',
          text: '💰 I\'ve found some excellent budget-friendly options under ₹3000. These offer great value without compromising on quality:'
        });
        setRecommendations(affordable);
        setConversationContext({ priceRange: 'budget' });
      } else if (lowerMessage.includes('expensive') || lowerMessage.includes('premium') || lowerMessage.includes('luxury') || lowerMessage.includes('high-end')) {
        const premium = productsData.filter(p => p.price > 3000).slice(0, 3);
        addMessage({
          type: 'ai',
          text: '✨ Here are our premium collection pieces. These are crafted with the finest materials and exclusive designs:'
        });
        setRecommendations(premium);
        setConversationContext({ priceRange: 'premium' });
      } else if (lowerMessage.includes('size')) {
        const sizeMatch = lowerMessage.match(/size\s+([smlx]+)/i);
        if (sizeMatch) {
          const size = sizeMatch[1].toUpperCase();
          const availableProducts = productsData.filter(p => p.stock[size] > 0);
          if (availableProducts.length > 0) {
            addMessage({
              type: 'ai',
              text: `📏 Perfect! I found ${availableProducts.length} items available in size ${size}. Here are your options:`
            });
            setRecommendations(availableProducts.slice(0, 3));
          } else {
            addMessage({
              type: 'ai',
              text: `😟 Sorry, size ${size} is currently out of stock. Would you like me to:\n\n• Show you similar items in other sizes\n• Notify you when it\'s back in stock\n• Recommend alternative products`
            });
          }
        } else {
          addMessage({
            type: 'ai',
            text: '📍 What size are you looking for? We have:\n\n• S (Small)\n• M (Medium)\n• L (Large)\n• XL (Extra Large)\n• XXL (Double Extra Large)\n\nJust let me know!'
          });
        }
      } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        addMessage({
          type: 'ai',
          text: '😊 You\'re welcome! Is there anything else I can help you find today?'
        });
      } else if (lowerMessage.includes('all') || lowerMessage.includes('show') || lowerMessage.includes('everything') || lowerMessage.includes('collection')) {
        addMessage({
          type: 'ai',
          text: '👗 Here\'s our complete collection! Browse through and let me know if anything catches your eye. I can provide more details on any item.'
        });
        setRecommendations(productsData);
      } else {
        // Smart contextual response based on conversation history
        const contextualSuggestions = [
          { text: 'a black leather jacket for a stylish look', emoji: '🧥' },
          { text: 'outfit ideas for a beach wedding', emoji: '🌴' },
          { text: 'formal shirts for professional settings', emoji: '👔' },
          { text: 'budget-friendly options under ₹3000', emoji: '💰' },
          { text: 'our premium collection pieces', emoji: '✨' }
        ];
        const suggestion = contextualSuggestions[Math.floor(Math.random() * contextualSuggestions.length)];
        addMessage({
          type: 'ai',
          text: `👋 I\'m here to help you find the perfect outfit! \n\nYou can ask me about:\n${suggestion.emoji} ${suggestion.text}\n📍 Specific sizes or colors\n📦 Order tracking\n👠 Occasion-based recommendations\n\nWhat would you like to explore?`
        });
      }
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage({ type: 'user', text: input });
    simulateAIResponse(input);
    setInput('');
  };

  const handleQuickAction = (action) => {
    if (action === 'recommend') {
      addMessage({ type: 'user', text: 'I need something for a casual beach wedding. Not too formal, but stylish' });
      simulateAIResponse('I need something for a casual beach wedding. Not too formal, but stylish');
    } else if (action === 'order') {
      addMessage({ type: 'user', text: 'Track my recent order' });
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          type: 'ai',
          text: '📦 **Order Status Update**\n\n**Order #ORD12345**\n• Placed: Dec 8, 2025\n• Status: Processing\n• Expected Delivery: Dec 12-14, 2025\n\nYour order is being carefully prepared and will ship within 24 hours. You\'ll receive a tracking number via email once it ships!'
        });
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl pointer-events-auto animate-slideDown"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-black">SmartStyle Assistant</h2>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Active Now
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black transition p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="bg-white px-6 py-6 h-[500px] overflow-y-auto custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl mx-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-gray-800 mb-2 font-semibold text-lg">
                  👋 Welcome to SmartStyle AI!
                </p>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  I\'m your personal shopping assistant powered by AI. I can help you find the perfect outfit, check product availability, track orders, and provide style recommendations.
                </p>
                <p className="text-xs text-gray-500 mb-4 font-medium">
                  Try these quick actions:
                </p>
                
                {/* Quick Actions */}
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => handleQuickAction('recommend')}
                    className="px-4 py-2.5 bg-black text-white rounded-full text-xs font-medium hover:bg-gray-800 transition flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Get Recommendations
                  </button>
                  <button
                    onClick={() => handleQuickAction('order')}
                    className="px-4 py-2.5 border-2 border-gray-300 rounded-full text-xs font-medium hover:border-black hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Track My Order
                  </button>
                </div>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg.text} type={msg.type} />
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4 animate-fadeIn">
                <div className="bg-white text-black px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-200 max-w-xs">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {recommendations.length > 0 && (
              <div className="mt-6 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-3 gap-3">
                  {recommendations.map(product => (
                    <div 
                      key={product.id} 
                      className="bg-gray-50 rounded-xl p-3 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        onClose();
                      }}
                    >
                      <div className="aspect-square bg-white rounded-lg mb-2 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                        👔
                      </div>
                      <h4 className="font-medium text-xs text-black mb-1 line-clamp-2">{product.name}</h4>
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm text-black">₹{product.price.toLocaleString('en-IN')}</p>
                        <button 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-black font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem(product, product.sizes[0]);
                            addMessage({
                              type: 'ai',
                              text: `Added ${product.name} to your cart! Size ${product.sizes[0]} selected. Want to add anything else?`
                            });
                          }}
                        >
                          + Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                placeholder="Type a message..."
                disabled={isTyping}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10 transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
