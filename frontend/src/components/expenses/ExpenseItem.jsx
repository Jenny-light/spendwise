import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon } from '../../utils/formatters';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Category Icon */}
          <div className={`text-2xl p-3 rounded-xl ${getCategoryColor(expense.category)}`}>
            {getCategoryIcon(expense.category)}
          </div>

          {/* Expense Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-secondary text-lg">
                {expense.title}
              </h3>
              <span
                className={`text-xl font-bold ${
                  expense.type === 'income' ? 'text-accent-blue' : 'text-accent-red'
                }`}
              >
                {expense.type === 'income' ? '+' : '-'}
                {formatCurrency(expense.amount)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className={`badge ${getCategoryColor(expense.category)}`}>
                {expense.category}
              </span>
              <span className="flex items-center gap-1">
                📅 {formatDate(expense.date)}
              </span>
              <span
                className={`badge ${
                  expense.type === 'income' ? 'badge-info' : 'badge-danger'
                }`}
              >
                {expense.type}
              </span>
            </div>

            {expense.description && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {expense.description}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(expense._id)}
            className="p-2 text-accent-red hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;