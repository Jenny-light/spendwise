import api from './api';

const expenseService = {
  // Get all expenses with optional filters
  getExpenses: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/expenses${params ? `?${params}` : ''}`);
    return response.data;
  },

  // Get single expense
  getExpenseById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  // Create expense
  createExpense: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  // Get expense statistics
  getStats: async () => {
    const response = await api.get('/expenses/stats');
    return response.data;
  },
};

export default expenseService;