import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import BottomNav from '../components/BottomNav';
import ChatModal from '../components/ChatModal';

export default function Profile() {
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const [activeTab, setActiveTab] = useState('orders');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const orderHistory = [
    {
      id: 'ORD12345',
      date: 'Dec 8, 2025',
      total: 4599,
      status: 'Processing',
      items: 1
    },
    {
      id: 'ORD12344',
      date: 'Nov 25, 2025',
      total: 3299,
      status: 'Delivered',
      items: 2
    }
  ];

  const savedAddresses = [
    {
      id: 1,
      name: 'Home',
      address: '123 Main Street, Mumbai, Maharashtra 400001'
    },
    {
      id: 2,
      name: 'Office',
      address: '456 Business Park, Bangalore, Karnataka 560001'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Welcome Back!</h1>
              <p className="text-gray-600">user@smartstyle.ai</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 px-1 font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-4 px-1 font-medium transition-colors ${
                activeTab === 'addresses'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-1 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black mb-6">Order History</h2>
            {orderHistory.map(order => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-black mb-1">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-black mb-1">₹{order.total.toLocaleString('en-IN')}</p>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="text-sm text-gray-600 hover:text-black font-medium">
                    View Details →
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="text-sm text-gray-600 hover:text-black font-medium">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Saved Addresses</h2>
              <button className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition">
                + Add New Address
              </button>
            </div>
            {savedAddresses.map(addr => (
              <div key={addr.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-black mb-2">{addr.name}</h3>
                    <p className="text-gray-600">{addr.address}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-sm text-gray-600 hover:text-black font-medium">
                      Edit
                    </button>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Account Settings</h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-black mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="SmartStyle User"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="user@smartstyle.ai"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>
              <button className="mt-6 bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition">
                Save Changes
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-black mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">Email Notifications</p>
                    <p className="text-sm text-gray-500">Get updates about your orders</p>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-full h-full bg-gray-200 rounded-full peer peer-checked:bg-black transition-colors cursor-pointer"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Receive special offers and updates</p>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-full h-full bg-gray-200 rounded-full peer peer-checked:bg-black transition-colors cursor-pointer"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNav onChatOpen={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
