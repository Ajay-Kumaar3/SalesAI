import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  History, 
  Sparkles 
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active 
        ? 'bg-emerald-50 text-emerald-600 font-medium' 
        : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/customers', icon: Users, label: 'Customers' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/audit-logs', icon: History, label: 'Audit Logs' },
    { to: '/ai-insights', icon: Sparkles, label: 'AI Insights' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
            <ShoppingCart className="fill-emerald-600/10" />
            <span>SalesAI</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.to}
              {...item}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Plan</p>
            <p className="text-sm font-medium text-emerald-900">Premium Account</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
