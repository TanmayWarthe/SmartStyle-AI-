# SmartStyle AI - Prototype

A demonstration web app showcasing an AI-powered retail conversational assistant with a clean black/white theme.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📸 How to Record Screenshots

### Recommended Screenshots for Presentation:

1. **Home Page** (`/`)
   - Shows hero banner, categories, and product grid
   - Full page screenshot

2. **Chat Interface** (`/chat`)
   - Type "I want a black jacket" to see AI recommendations
   - Capture with visible product recommendations

3. **Product Detail** (`/product/1`)
   - Shows product details, size selector, and AI styling suggestions
   - Full page view

4. **Checkout** (`/checkout`)
   - Add items to cart first (from home or chat)
   - Shows cart items, address, payment options, and order summary
   - Capture with order summary visible

5. **Confirmation** (`/confirmation`)
   - Complete a purchase to see this page
   - Shows success message and order ID

6. **Recommendations** (`/recommendations`)
   - Shows filtered product grid with category and price filters

### Screenshot Tips:

- **Browser Window Size:** Set to 1366×768 for optimal presentation slides
- **Windows Snipping Tool:** Use Win + Shift + S for quick captures
- **Browser DevTools:** Press F12, toggle device toolbar (Ctrl+Shift+M) to set exact dimensions
- **Full Page:** For full-page screenshots, use browser extensions like "GoFullPage"

## 🎯 Quick Demo Flow

To quickly populate the app for screenshots:

1. **Start on Home** → Click "Chat with SmartStyle AI"
2. **In Chat** → Click "Recommend outfits" or type "I want a black jacket"
3. **Click "Add to Cart"** on any recommended product
4. **Navigate to Checkout** using cart icon in header
5. **Complete Purchase** to see confirmation page

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS (dark theme)
- **Routing:** React Router v6
- **State Management:** Zustand
- **Mock Data:** Local JSON files

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Main navigation header
│   ├── ProductCard.jsx          # Reusable product card
│   ├── ChatBubble.jsx          # Chat message bubble
│   ├── CartSummary.jsx         # Order summary component
│   └── MockVideoPlaceholder.jsx # Video demo placeholder
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── Chat.jsx                # WhatsApp-style chat
│   ├── Recommendations.jsx      # Filtered product list
│   ├── ProductDetail.jsx        # Individual product page
│   ├── Checkout.jsx            # Cart & checkout
│   └── Confirmation.jsx         # Order confirmation
├── context/
│   ├── CartContext.jsx         # Shopping cart state
│   └── SessionContext.jsx       # Chat session state
├── data/
│   └── products.json           # Mock product data
└── styles/
    └── index.css               # Global styles + Tailwind
```

## 🎨 Features

### Home Page
- Hero banner with CTA
- Category quick links
- Product grid with "Add to Cart"

### Chat Interface
- WhatsApp-style UI
- AI message simulation with typing indicator
- Quick action chips
- Product recommendations in chat
- Size availability checking

### Product Detail
- Large product display
- Size selector (disabled for out-of-stock)
- AI styling suggestions
- Add to cart functionality

### Checkout
- Cart management (add/remove/update quantity)
- Delivery address input
- Payment method selection (UPI/Card/Wallet)
- Loyalty points toggle (10% discount)
- Real-time order summary

### Confirmation
- Success animation
- Order ID generation
- Order tracking info
- Quick actions

## 🎭 Demo Features

- **Mock AI Responses:** Simulated typing delay and smart responses
- **Size Checking:** Ask "is size M available?" in chat
- **Inventory Display:** Real-time stock status
- **Cart Persistence:** Uses Zustand for state management
- **Responsive Design:** Works on desktop and mobile

## 🔧 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```js
colors: {
  'brand-dark': '#1F2430',
  'brand-darker': '#0F1419',
  'brand-accent': '#F6C600',
}
```

### Add More Products
Edit `src/data/products.json` following the schema:
```json
{
  "id": "7",
  "name": "Product Name",
  "price": 9999,
  "sizes": ["S", "M", "L"],
  "stock": {"S": 5, "M": 0, "L": 3},
  "category": "Category",
  "image": "/product-7.jpg",
  "description": "Product description"
}
```

## 📝 Notes

- This is a **prototype** - no real backend or payment processing
- All AI responses are simulated with mock logic
- Product images use emoji placeholders (can be replaced with actual images in `/public`)
- Cart data is not persisted (resets on page refresh)
- No authentication required

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Tailwind styles not loading?**
- Ensure `index.html` includes the script tag for `main.jsx`
- Check that `postcss.config.js` and `tailwind.config.js` are in root

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This is a demonstration prototype for educational purposes.

---

**Built with ❤️ for SmartStyle AI Demo**
# SmartStyle-AI-
