// Chat AI Helper Functions

// Enhanced NLP intent detection
export const detectIntent = (message) => {
  const lower = message.toLowerCase();
  
  // Category detection
  const categories = {
    'jacket': ['jacket', 'blazer', 'coat', 'outerwear'],
    'shirt': ['shirt', 'top', 'blouse', 'tee', 't-shirt'],
    'pants': ['pants', 'jeans', 'trousers', 'chinos'],
    'shoes': ['shoes', 'footwear', 'sneakers', 'boots'],
    'accessories': ['accessories', 'watch', 'bag', 'belt', 'hat']
  };
  
  // Occasion detection
  const occasions = {
    'casual': ['casual', 'everyday', 'relaxed', 'comfortable'],
    'formal': ['formal', 'professional', 'business', 'office', 'work'],
    'party': ['party', 'night out', 'clubbing', 'celebration'],
    'wedding': ['wedding', 'marriage', 'ceremony'],
    'beach': ['beach', 'summer', 'vacation', 'tropical']
  };
  
  // Price detection
  const priceMatch = lower.match(/(under|below|less than|max)\s*(₹|rs\.?)?\s*(\d+)/);
  const budgetKeywords = ['cheap', 'affordable', 'budget', 'inexpensive'];
  const premiumKeywords = ['premium', 'luxury', 'expensive', 'high-end', 'designer'];
  
  // Size detection
  const sizeMatch = lower.match(/\b(xs|s|m|l|xl|xxl|2xl|small|medium|large|extra large)\b/);
  
  // Color detection
  const colors = ['black', 'white', 'blue', 'red', 'green', 'yellow', 'grey', 'gray', 'brown', 'pink', 'purple'];
  const colorMatch = colors.find(color => lower.includes(color));
  
  return {
    category: Object.keys(categories).find(cat => 
      categories[cat].some(keyword => lower.includes(keyword))
    ),
    occasion: Object.keys(occasions).find(occ => 
      occasions[occ].some(keyword => lower.includes(keyword))
    ),
    priceLimit: priceMatch ? parseInt(priceMatch[3]) : null,
    isBudget: budgetKeywords.some(kw => lower.includes(kw)),
    isPremium: premiumKeywords.some(kw => lower.includes(kw)),
    size: sizeMatch ? sizeMatch[1].toUpperCase() : null,
    color: colorMatch,
    isHelp: lower.includes('help') || lower.includes('what can you'),
    isTracking: lower.includes('track') || lower.includes('order') || lower.includes('delivery'),
    isThanks: lower.includes('thank') || lower.includes('thanks')
  };
};

// Generate AI response based on intent
export const generateResponse = (intent, context) => {
  if (intent.isHelp) {
    return {
      text: '🤖 **I\'m your SmartStyle AI Shopping Assistant!**\n\nI can help you with:\n\n✨ **Product Discovery**\n• Find items by category, color, size\n• Occasion-based recommendations\n• Price-range filtering\n\n📦 **Shopping Assistance**\n• Check product availability\n• Track orders & deliveries\n• Compare products\n\n💡 **Style Advice**\n• Outfit combinations\n• Trend recommendations\n• Personalized suggestions\n\n**Try asking:**\n"Show me black jackets under ₹5000"\n"What should I wear to a beach wedding?"\n"Track my order"'
    };
  }
  
  if (intent.isTracking) {
    return {
      text: '📦 **Order Status**\n\n**Order #ORD-83920**\n───────────────────\n📅 Placed: Dec 8, 2025\n📍 Status: **Out for Delivery**\n🚚 Courier: FedEx Express\n📍 Location: Near You\n⏰ ETA: Today by 6:00 PM\n\n✅ Quality Check Complete\n✅ Packed Securely\n✅ Dispatched\n🚚 Out for Delivery\n\nYou\'ll receive a notification when it arrives!'
    };
  }
  
  if (intent.isThanks) {
    return {
      text: '😊 You\'re welcome! Happy to help.\n\nNeed anything else? I\'m here for:\n• More recommendations\n• Size/fit questions\n• Order assistance'
    };
  }
  
  return null;
};

// Filter products based on intent
export const filterProducts = async (products, intent, productAPI) => {
  let filtered = [...products];
  let responseText = '✨ **Perfect! Here are my recommendations:**\n\n';
  
  // Category-based search
  if (intent.category) {
    const categoryKeywords = {
      'jacket': 'jacket',
      'shirt': 'shirt',
      'pants': 'pants',
      'shoes': 'shoes'
    };
    const searchTerm = categoryKeywords[intent.category];
    if (searchTerm) {
      filtered = await productAPI.searchProducts(searchTerm);
      responseText = `🎯 Found ${filtered.length} ${intent.category}s for you:\n\n`;
    }
  }
  
  // Price filtering
  if (intent.priceLimit) {
    filtered = filtered.filter(p => p.price <= intent.priceLimit);
    responseText += `💰 Under ₹${intent.priceLimit}\n`;
  } else if (intent.isBudget) {
    filtered = filtered.filter(p => p.price < 3000);
    responseText = '💰 **Budget-Friendly Options** (Under ₹3000)\n\n';
  } else if (intent.isPremium) {
    filtered = filtered.filter(p => p.price > 5000);
    responseText = '✨ **Premium Collection** (₹5000+)\n\n';
  }
  
  // Size filtering
  if (intent.size && filtered[0]?.stock) {
    const sizeAvailable = filtered.filter(p => p.stock[intent.size] > 0);
    if (sizeAvailable.length > 0) {
      filtered = sizeAvailable;
      responseText += `📏 Size ${intent.size} Available\n`;
    } else {
      return {
        filtered: [],
        responseText: `😟 Sorry, size ${intent.size} is currently out of stock.\n\n**Alternatives:**\n• Check other sizes\n• Get notified when back in stock\n• Browse similar products`,
        noStock: true
      };
    }
  }
  
  // Occasion context
  if (intent.occasion) {
    responseText += `🌟 Perfect for ${intent.occasion} occasions\n`;
  }
  
  return {
    filtered: filtered.slice(0, 4),
    responseText: responseText + `\nI've selected ${Math.min(filtered.length, 4)} items based on your preferences. Each one offers great quality and style!`,
    noStock: false
  };
};

// Message persistence
export const saveMessagesToStorage = (messages) => {
  try {
    localStorage.setItem('smartstyle_chat_messages', JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save messages:', error);
  }
};

export const loadMessagesFromStorage = () => {
  try {
    const saved = localStorage.getItem('smartstyle_chat_messages');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load messages:', error);
    return [];
  }
};

export const clearChatHistory = () => {
  try {
    localStorage.removeItem('smartstyle_chat_messages');
  } catch (error) {
    console.error('Failed to clear messages:', error);
  }
};
