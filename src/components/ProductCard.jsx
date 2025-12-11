import { Link } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';

export default function ProductCard({ product, showAddToCart = true, onToast }) {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    const availableSize = product.sizes.find(size => product.stock[size] > 0);
    if (availableSize) {
      addItem(product, availableSize);
      if (onToast) {
        onToast({ message: `Added ${product.name} to cart!`, type: 'success' });
      }
    }
  };

  return (
    <div className="group cursor-pointer space-y-3">
      <Link to={`/product/${product.id}`}>
        <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden relative">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium bg-gray-50 group-hover:bg-gray-100 transition" style={{ display: product.image ? 'none' : 'flex' }}>
            Image
          </div>
        </div>
      </Link>
      
      <div className="space-y-1">
        <Link to={`/product/${product.id}`}>
          <h4 className="font-bold text-base hover:underline line-clamp-1">{product.name}</h4>
        </Link>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="font-semibold text-base">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}
