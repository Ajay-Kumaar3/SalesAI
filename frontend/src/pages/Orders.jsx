import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Calendar, User, X, Package } from 'lucide-react';
import { orderService } from '../services/api';

const OrderDetailsModal = ({ order, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Order #{order.OrderID} Details</h2>
          <p className="text-sm text-slate-500">{new Date(order.OrderDate).toLocaleString()}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all">
          <X size={24} />
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto max-h-[60vh]">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-50">
            <Package size={16} />
            <span>Ordered Items</span>
          </div>
          
          <table className="w-full text-left">
            <thead className="text-xs text-slate-400 uppercase font-bold">
              <tr>
                <th className="pb-4">Product Name</th>
                <th className="pb-4 text-center">Qty</th>
                <th className="pb-4 text-right">Price</th>
                <th className="pb-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.OrderItems?.map((item) => (
                <tr key={item.OrderItemID} className="group">
                  <td className="py-4">
                    <p className="font-bold text-slate-900">Product ID: {item.ProductID}</p>
                    <p className="text-xs text-slate-400">Unit Price: ${parseFloat(item.UnitPrice).toFixed(2)}</p>
                  </td>
                  <td className="py-4 text-center font-medium text-slate-600">{item.Quantity}</td>
                  <td className="py-4 text-right font-medium text-slate-600">${parseFloat(item.UnitPrice).toFixed(2)}</td>
                  <td className="py-4 text-right font-bold text-emerald-600">${(item.Quantity * item.UnitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-500">
          <User size={18} />
          <span className="text-sm font-medium">Customer ID: {order.CustomerID}</span>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Grand Total</p>
          <p className="text-3xl font-black text-slate-900">${parseFloat(order.TotalAmount).toFixed(2)}</p>
        </div>
      </div>
    </div>
  </div>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
          <div 
            key={order.OrderID} 
            onClick={() => setSelectedOrder(order)}
            className="card hover:border-emerald-200 transition-colors cursor-pointer group"
          >
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

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default Orders;
