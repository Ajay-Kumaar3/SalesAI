import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { customerService, productService, orderService } from '../services/api';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="card">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{trendValue}%</span>
        </div>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [c, p, o] = await Promise.all([
          customerService.getAll(),
          productService.getAll(),
          orderService.getAll(),
        ]);
        
        const rev = Array.isArray(o.data) ? o.data.reduce((acc, curr) => acc + parseFloat(curr.TotalAmount || 0), 0) : 0;
        
        setStats({
          customers: Array.isArray(c.data) ? c.data.length : 0,
          products: Array.isArray(p.data) ? p.data.length : 0,
          orders: Array.isArray(o.data) ? o.data.length : 0,
          revenue: rev,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
  ];

  const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
        <p className="text-slate-500">Real-time business performance overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Customers" value={stats.customers} icon={Users} trend="up" trendValue="12" />
        <StatCard title="Total Products" value={stats.products} icon={Package} trend="up" trendValue="5" />
        <StatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} trend="down" trendValue="2" />
        <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={TrendingUp} trend="up" trendValue="15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card h-96">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Revenue Growth</h2>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card h-96">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Sales Category Distribution</h2>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="sales"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
