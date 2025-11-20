import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDateForInput } from '../../utils/formatters';

const CATEGORIES = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Education',
  'Travel',
  'Other',
];

const ExpenseForm = ({ expense, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: formatDateForInput(new Date()),
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        type: expense.type,
        date: formatDateForInput(expense.date),
        description: expense.description || '',
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <Input
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Grocery Shopping"
        error={errors.title}
        required
      />

      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="0.00"
        step="0.01"
        min="0"
        error={errors.amount}
        required
      />

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type <span className="text-accent-red">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formData.type === 'expense'}
              onChange={handleChange}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Expense</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === 'income'}
              onChange={handleChange}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Income</span>
          </label>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category <span className="text-accent-red">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input"
          required
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        required
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add notes about this transaction..."
          rows="3"
          className="input resize-none"
          maxLength="500"
        />
        <p className="mt-1 text-xs text-gray-500">
          {formData.description.length}/500 characters
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : expense ? 'Update' : 'Add Expense'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;