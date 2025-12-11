import { Link } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';

export default function ProductCard({ product, showAddToCart = true }) {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    const availableSize = product.sizes.find(size => product.stock[size] > 0);
    if (availableSize) {
      addItem(product, availableSize);
      alert(`Added ${product.name} (Size: ${availableSize}) to cart!`);
    }
  };

  return (
    <div className="group cursor-pointer space-y-3">
      <Link to={`/product/${product.id}`}>
        <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden relative">
          <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium bg-gray-50 group-hover:bg-gray-100 transition">
            Image
          </div>
        </div>
      </Link>
      
      <div className="space-y-1">
        <Link to={`/product/${product.id}`}>
          <h4 className="font-bold text-lg hover:underline">{product.name}</h4>
        </Link>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="font-semibold">${(product.price / 83).toFixed(2)}</p>
      </div>
    </div>
  );
}
