import { useCartStore } from '../context/CartContext';

export default function CartSummary({ showLoyalty = false, loyaltyApplied = false }) {
  const items = useCartStore(state => state.items);
  const getTotal = useCartStore(state => state.getTotal);
  
  const subtotal = getTotal();
  const loyaltyDiscount = loyaltyApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - loyaltyDiscount) * 0.05;
  const total = subtotal - loyaltyDiscount + tax;

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-black">Order Summary</h3>
      
      <div className="space-y-3 mb-4">
        {items.map((item, index) => (
          <div key={`${item.id}-${item.size}-${index}`} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} ({item.size}) x {item.quantity}
            </span>
            <span className="text-black">
              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-black">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        
        {showLoyalty && loyaltyApplied && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Loyalty Discount (10%)</span>
            <span>-₹{loyaltyDiscount.toLocaleString('en-IN')}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (5%)</span>
          <span className="text-black">₹{tax.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
          <span className="text-black">Total</span>
          <span className="text-black">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
