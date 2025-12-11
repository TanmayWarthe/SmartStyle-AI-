import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import BottomNav from '../components/BottomNav';
import ChatModal from '../components/ChatModal';
import Toast from '../components/Toast';
import { productAPI } from '../services/api';

export default function Recommendations() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [toast, setToast] = useState(null);
  
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹2000', min: 0, max: 2000 },
    { label: '₹2000-₹5000', min: 2000, max: 5000 },
    { label: 'Above ₹5000', min: 5000, max: Infinity }
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { products: apiProducts } = await productAPI.getAllProducts(30);
      setProducts(apiProducts);
      
      // Get unique categories
      const uniqueCategories = ['All', ...new Set(apiProducts.map(p => p.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const range = priceRanges.find(r => r.label === priceRange);
    const priceMatch = product.price >= range.min && product.price < range.max;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">All Products</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        )}
        
        {!loading && (
        <>
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
            <ProductCard key={product.id} product={product} onToast={setToast} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">No products found matching your filters.</p>
          </div>
        )}
        </>
        )}
      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
