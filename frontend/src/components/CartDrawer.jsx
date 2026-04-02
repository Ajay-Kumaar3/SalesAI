import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-600" size={24} />
            <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-slate-300" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">Empty Cart</p>
                <p className="text-sm text-slate-500">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
              >
                Go Shop
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.ProductID} className="flex gap-4 group">
                <div className="w-20 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200" alt={item.Name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{item.Name}</h4>
                    <p className="text-sm text-emerald-600 font-bold mt-1">${item.Price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-slate-200 rounded-lg p-1 gap-3">
                      <button 
                        onClick={() => updateQuantity(item.ProductID, item.quantity - 1)}
                        className="p-1 hover:text-emerald-600 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.ProductID, item.quantity + 1)}
                        className="p-1 hover:text-emerald-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.ProductID)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-slate-900">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-slate-500">Shipping and taxes calculated at checkout.</p>
            <Link 
              to="/store/checkout" 
              onClick={onClose}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
            >
              Checkout <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
