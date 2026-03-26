import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Calendar, User, DollarSign } from 'lucide-react';
import { orderService } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getAll();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-500">Track and manage customer transactions.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="card h-24 animate-pulse bg-slate-50/50"></div>
          ))
        ) : orders.length === 0 ? (
          <div className="card text-center py-12">
            <ShoppingBag className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500">No orders found. Start by creating one!</p>
          </div>
        ) : orders.map((order) => (
          <div key={order.OrderID} className="card hover:border-emerald-200 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-lg">Order #{order.OrderID}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>Customer ID: {order.CustomerID}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(order.OrderDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Amount</p>
                  <p className="text-xl font-bold text-slate-900">${parseFloat(order.TotalAmount).toFixed(2)}</p>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
