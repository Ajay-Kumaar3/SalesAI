import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, LogOut } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import CartDrawer from './CartDrawer';

const StoreLayout = ({ children }) => {
  const { cartCount } = useCart();
  const { logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/store" className="text-2xl font-bold text-emerald-600 flex items-center gap-2">
                <ShoppingCart className="fill-emerald-600/10" />
                <span>SalesAI</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/store" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Home</Link>
                <Link to="/store/catalog" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Shop All</Link>
                <Link to="/store/categories" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Categories</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center relative">
                <Search className="absolute left-3 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 rounded-full text-sm transition-all outline-none w-64"
                />
              </div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-slate-600 hover:text-emerald-600 relative group"
              >
                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white animate-in fade-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link to="/admin" className="p-2 text-slate-600 hover:text-emerald-600">
                <User size={22} />
              </Link>
              <button onClick={logout} className="p-2 text-rose-500 hover:text-rose-700">
                <LogOut size={22} />
              </button>
              <button className="md:hidden p-2 text-slate-600">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Premium Footer */}
      <footer className="bg-white border-t border-slate-100 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-emerald-600">SalesAI</h3>
            <p className="text-sm text-slate-500">Elevating your shopping experience with AI-driven insights and premium quality products.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/store/catalog">New Arrivals</Link></li>
              <li><Link to="/store/catalog">Best Sellers</Link></li>
              <li><Link to="/store/catalog">Exclusive Deals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="#">Order Tracking</Link></li>
              <li><Link to="#">Shipping Policy</Link></li>
              <li><Link to="#">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" />
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          © 2024 SalesAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
