import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import AuditLogs from './pages/AuditLogs';
import AIInsights from './pages/AIInsights';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/ai-insights" element={<AIInsights />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
