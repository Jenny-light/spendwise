import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = {
  Food: '#F59E0B',
  Transportation: '#3B82F6',
  Entertainment: '#8B5CF6',
  Shopping: '#EC4899',
  Bills: '#EF4444',
  Healthcare: '#10B981',
  Education: '#6366F1',
  Travel: '#F59E0B',
  Other: '#6B7280',
};

const ExpenseChart = ({ data, type = 'pie' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || COLORS.Other}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="value" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default ExpenseChart;