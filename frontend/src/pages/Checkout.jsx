import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: '', card: '**** **** **** 4242'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // 1. Create a dummy customer (or find existing email)
      const customerRes = await axios.post('http://localhost:5000/api/customers', {
        Name: formData.name,
        Email: formData.email,
        Address: `${formData.address}, ${formData.city} ${formData.zip}`
      });

      // 2. Create the order
      await axios.post('http://localhost:5000/api/orders', {
        CustomerID: customerRes.data.CustomerID,
        TotalAmount: cartTotal,
        items: cart.map(item => ({
          ProductID: item.ProductID,
          Quantity: item.quantity,
          UnitPrice: item.Price
        }))
      });

      setIsSuccess(true);
      clearCart();
      setTimeout(() => navigate('/store'), 3000);
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
        <CheckCircle2 size={80} className="text-emerald-500 animate-bounce" />
        <h1 className="text-4xl font-black text-slate-900">Order Successful!</h1>
        <p className="text-slate-500 max-w-sm">Thank you for shopping with SalesAI. Your order has been placed and is being processed.</p>
        <Link to="/store" className="text-emerald-600 font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/store/catalog" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Truck className="text-emerald-500" /> Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="Full Name" className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <input required placeholder="Street Address" className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              onChange={e => setFormData({...formData, address: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="City" className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                onChange={e => setFormData({...formData, city: e.target.value})} />
              <input required placeholder="ZIP Code" className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                onChange={e => setFormData({...formData, zip: e.target.value})} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CreditCard className="text-emerald-500" /> Payment Method
            </h2>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-slate-900 rounded-md flex items-center justify-center text-[10px] text-white font-bold tracking-widest">VISA</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Ending in 4242</p>
                  <p className="text-xs text-slate-500">Expires 12/26</p>
                </div>
              </div>
              <ShieldCheck className="text-emerald-600" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isProcessing || cart.length === 0}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Place Order • $${cartTotal.toFixed(2)}`}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 h-fit space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Order Summary</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.ProductID} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 text-xs">{item.quantity}x</span>
                  <span className="font-medium text-slate-600">{item.Name}</span>
                </div>
                <span className="font-bold text-slate-900">${(item.Price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-xl font-black text-slate-900 pt-2">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
