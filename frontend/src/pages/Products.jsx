import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Package, X } from 'lucide-react';
import { productService } from '../services/api';

const AddProductModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Price: '',
    StockQuantity: '',
    Category: 'General'
  });
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let finalData = { ...formData };
      if (image) {
        const reader = new FileReader();
        const base64Promise = new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
        });
        reader.readAsDataURL(image);
        finalData.ImageURL = await base64Promise;
      }
      await productService.create(finalData);
      onSave();
      onClose();
    } catch (err) {
      console.error('Failed to add product', err);
      alert('Failed to add product. Please check your inputs.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Product Name</label>
            <input 
              required
              className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              onChange={e => setFormData({...formData, Name: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea 
              className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 min-h-[100px]"
              onChange={e => setFormData({...formData, Description: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Category</label>
            <select 
              className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              onChange={e => setFormData({...formData, Category: e.target.value})}
              value={formData.Category}
            >
              <option value="General">General</option>
              <option value="Electronics">Electronics</option>
              <option value="Software">Software</option>
              <option value="Accessories">Accessories</option>
              <option value="Services">Services</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Price ($)</label>
              <input 
                required type="number" step="0.01"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                onChange={e => setFormData({...formData, Price: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Stock</label>
              <input 
                required type="number"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                onChange={e => setFormData({...formData, StockQuantity: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Product Image</label>
            <input 
              type="file" accept="image/*"
              className="w-full p-2 bg-slate-50 border border-dashed border-slate-300 rounded-xl focus:border-emerald-500 outline-none"
              onChange={e => setImage(e.target.files[0])}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSaving}
            className="w-full py-4 mt-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.delete(id);
        fetchProducts(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete product. It might be linked to existing orders.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500">Manage your inventory and pricing.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="card !p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by product name..." 
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-4 h-16 bg-slate-50/50"></td>
                </tr>
              ))
            ) : filteredProducts.map((product) => (
              <tr key={product.ProductID} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 overflow-hidden">
                      {product.ImageURL ? (
                        <img src={product.ImageURL} alt={product.Name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={20} />
                      )}
                    </div>
                    <span className="font-medium text-slate-900">{product.Name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-900 font-semibold">${product.Price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    product.StockQuantity > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {product.StockQuantity} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">{product.Description}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleDelete(product.ProductID)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddProductModal 
          onClose={() => setIsModalOpen(false)}
          onSave={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
