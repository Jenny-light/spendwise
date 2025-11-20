import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import expenseService from '../../services/expenseService';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Loader from '../common/Loader';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [error, setError] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    sort: 'newest',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [expenses, filters]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch (error) {
      setError('Failed to fetch expenses');
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...expenses];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          exp.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((exp) => exp.category === filters.category);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter((exp) => exp.type === filters.type);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.amount - a.amount;
        case 'lowest':
          return a.amount - b.amount;
        default: // newest
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredExpenses(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = async (expenseData) => {
    try {
      setSubmitLoading(true);
      await expenseService.createExpense(expenseData);
      await fetchExpenses();
      setIsModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add expense');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      setSubmitLoading(true);
      await expenseService.updateExpense(editingExpense._id, expenseData);
      await fetchExpenses();
      setIsModalOpen(false);
      setEditingExpense(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update expense');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        await fetchExpenses();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete expense');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      type: '',
      sort: 'newest',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Expenses</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your transactions
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus size={20} />
          Add Expense
        </Button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search expenses..."
              className="input pl-10"
            />
          </div>

          {/* Category Filter */}
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="input"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
          </select>

          {/* Type Filter */}
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="input"
          >
            <option value="">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* Sort */}
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="input"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.category || filters.type) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.search && (
              <span className="badge badge-info">Search: {filters.search}</span>
            )}
            {filters.category && (
              <span className="badge badge-success">{filters.category}</span>
            )}
            {filters.type && (
              <span className="badge badge-warning">{filters.type}</span>
            )}
            <button
              onClick={resetFilters}
              className="text-sm text-primary hover:text-primary-dark ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Expense List */}
      {error && (
        <div className="bg-red-50 border border-accent-red text-accent-red px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-secondary mb-2">
            No expenses found
          </h3>
          <p className="text-gray-600 mb-4">
            {filters.search || filters.category || filters.type
              ? 'Try adjusting your filters'
              : 'Start by adding your first expense'}
          </p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
            Add Your First Expense
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing <strong>{filteredExpenses.length}</strong> of{' '}
              <strong>{expenses.length}</strong> transactions
            </p>
          </div>

          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <ExpenseItem
                key={expense._id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingExpense ? 'Edit Expense' : 'Add New Expense'}
      >
        <ExpenseForm
          expense={editingExpense}
          onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          onCancel={handleModalClose}
          loading={submitLoading}
        />
      </Modal>
    </div>
  );
};

export default ExpenseList;