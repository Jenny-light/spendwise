import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const StatsCard = ({ title, amount, icon: Icon, type = 'default', trend }) => {
  const typeStyles = {
    income: 'bg-blue-50 text-accent-blue',
    expense: 'bg-red-50 text-accent-red',
    balance: 'bg-green-50 text-primary',
    default: 'bg-gray-50 text-gray-700',
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-secondary">
            {formatCurrency(amount)}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend > 0 ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {Math.abs(trend)}%
              </span>
              <span className="text-sm text-gray-500">from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${typeStyles[type]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;