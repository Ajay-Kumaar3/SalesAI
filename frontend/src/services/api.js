import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const customerService = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const orderService = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  delete: (id) => api.delete(`/orders/${id}`),
};

export const auditService = {
  getAll: (params) => api.get('/audit-logs', { params }),
};

export const aiService = {
  getInsights: () => api.get('/ai/insights'),
};

export const analyticsService = {
  getStats: () => api.get('/analytics/stats'),
  getRevenue: () => api.get('/analytics/revenue'),
  getCategories: () => api.get('/analytics/categories'),
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export default api;
