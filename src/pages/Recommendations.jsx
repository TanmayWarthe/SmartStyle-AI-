import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import BottomNav from '../components/BottomNav';
import ChatModal from '../components/ChatModal';

export default function Recommendations() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const categories = ['All', 'Jackets', 'Shirts', 'Jeans', 'Blazers', 'Footwear', 'T-Shirts'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹2000', min: 0, max: 2000 },
    { label: '₹2000-₹5000', min: 2000, max: 5000 },
    { label: 'Above ₹5000', min: 5000, max: Infinity }
  ];

  const filteredProducts = productsData.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const range = priceRanges.find(r => r.label === priceRange);
    const priceMatch = product.price >= range.min && product.price < range.max;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">All Products</h1>
        
        {/* Filters */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black mb-2 font-semibold">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-black focus:outline-none focus:border-gray-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-black mb-2 font-semibold">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-black focus:outline-none focus:border-gray-400"
              >
                {priceRanges.map(range => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">No products found matching your filters.</p>
          </div>
        )}
      </div>
      
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
