import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, UserPlus, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../components/AuthContext';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ Username: '', Password: '', Role: 'user' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const user = await login({ Username: formData.Username, Password: formData.Password });
        navigate(user.Role === 'admin' ? '/admin' : '/store');
      } else {
        await register(formData);
        setIsLogin(true);
        alert('Account created! Please sign in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-slate-50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 text-3xl font-black text-emerald-600 mb-6">
            <ShoppingCart className="fill-emerald-600/10" size={40} />
            <span>SalesAI</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 mt-2">
            {isLogin ? 'Enter your credentials to access your workspace' : 'Join the most intelligent shopping platform'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-medium border border-rose-100 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  required
                  type="text"
                  placeholder="Enter username"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 transition-all font-medium"
                  value={formData.Username}
                  onChange={e => setFormData({...formData, Username: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 transition-all font-medium"
                  value={formData.Password}
                  onChange={e => setFormData({...formData, Password: e.target.value})}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Account Type</label>
                <select 
                  className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 transition-all font-medium appearance-none"
                  value={formData.Role}
                  onChange={e => setFormData({...formData, Role: e.target.value})}
                >
                  <option value="user">Customer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? (
                    <>Sign In <LogIn size={20} /></>
                  ) : (
                    <>Create Account <UserPlus size={20} /></>
                  )}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-500 font-medium hover:text-emerald-600 transition-colors"
            >
              {isLogin ? (
                <span>Don't have an account? <span className="text-emerald-600 font-bold">Register Now</span></span>
              ) : (
                <span>Already have an account? <span className="text-emerald-600 font-bold">Sign In</span></span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-slate-400 text-sm font-medium">
          © 2024 SalesAI • Secure Infrastructure
        </div>
      </div>
    </div>
  );
};

export default SignIn;
