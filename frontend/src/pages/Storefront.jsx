import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
      <Icon size={24} />
    </div>
    <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

const Storefront = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/50 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <Zap size={14} />
              New Collection 2024
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight">
              Elevate Your <span className="text-emerald-400">Lifestyle</span> With SalesAI
            </h1>
            <p className="text-xl text-emerald-50/80 leading-relaxed">
              Discover a curated selection of premium electronics and lifestyle essentials, backed by intelligent data-driven insights.
            </p>
            <div className="flex gap-4 pt-4">
              <Link 
                to="/store/catalog" 
                className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FeatureCard 
            icon={ShieldCheck} 
            title="Premium Quality" 
            desc="Only the finest products reach our store shelf."
          />
          <FeatureCard 
            icon={Zap} 
            title="Fast Shipping" 
            desc="Get your items delivered within 48 hours."
          />
          <FeatureCard 
            icon={Star} 
            title="AI Powered" 
            desc="Smart recommendations tailored just for you."
          />
          <FeatureCard 
            icon={ArrowRight} 
            title="24/7 Support" 
            desc="Dedicated assistance whenever you need it."
          />
        </div>
      </section>

      {/* Product Highlight Placeholder */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold">Intelligent Recommendations</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Our AI analyzes thousands of data points to find the products that match your style and needs perfectly.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-slate-800 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Storefront;
