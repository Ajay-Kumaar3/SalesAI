import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import StoreLayout from './components/StoreLayout';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import AuditLogs from './pages/AuditLogs';
import AIInsights from './pages/AIInsights';

// Store Pages
import Storefront from './pages/Storefront';
import ProductCatalog from './pages/ProductCatalog';
import Checkout from './pages/Checkout';

// Auth Page
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Auth Route */}
            <Route path="/" element={<SignIn />} />

            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/admin/customers" element={<ProtectedRoute roleRequired="admin"><Layout><Customers /></Layout></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute roleRequired="admin"><Layout><Products /></Layout></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute roleRequired="admin"><Layout><Orders /></Layout></ProtectedRoute>} />
            <Route path="/admin/audit-logs" element={<ProtectedRoute roleRequired="admin"><Layout><AuditLogs /></Layout></ProtectedRoute>} />
            <Route path="/admin/ai-insights" element={<ProtectedRoute roleRequired="admin"><Layout><AIInsights /></Layout></ProtectedRoute>} />

            {/* Store Routes */}
            <Route path="/store" element={<ProtectedRoute roleRequired="user"><StoreLayout><Storefront /></StoreLayout></ProtectedRoute>} />
            <Route path="/store/catalog" element={<ProtectedRoute roleRequired="user"><StoreLayout><ProductCatalog /></StoreLayout></ProtectedRoute>} />
            <Route path="/store/checkout" element={<ProtectedRoute roleRequired="user"><StoreLayout><Checkout /></StoreLayout></ProtectedRoute>} />
            
            {/* Legacy Redirects */}
            <Route path="/customers" element={<Navigate to="/admin/customers" replace />} />
            <Route path="/products" element={<Navigate to="/admin/products" replace />} />
            <Route path="/orders" element={<Navigate to="/admin/orders" replace />} />
            <Route path="/audit-logs" element={<Navigate to="/admin/audit-logs" replace />} />
            <Route path="/ai-insights" element={<Navigate to="/admin/ai-insights" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
