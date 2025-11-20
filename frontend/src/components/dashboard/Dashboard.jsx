import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import expenseService from '../../services/expenseService';
import StatsCard from './StatsCard';
import ExpenseChart from './ExpenseChart';
import Loader from '../common/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await expenseService.getStats();
      setStats(data);
    } catch (error) {
      setError('Failed to fetch statistics');
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-accent-red">{error}</p>
      </div>
    );
  }

  // Prepare chart data
  const categoryData = Object.entries(stats?.byCategory || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Balance"
          amount={stats?.balance || 0}
          icon={DollarSign}
          type="balance"
        />
        <StatsCard
          title="Total Income"
          amount={stats?.totalIncome || 0}
          icon={TrendingUp}
          type="income"
        />
        <StatsCard
          title="Total Expenses"
          amount={stats?.totalExpenses || 0}
          icon={TrendingDown}
          type="expense"
        />
        <StatsCard
          title="Transactions"
          amount={stats?.expenseCount + stats?.incomeCount || 0}
          icon={PieChart}
          type="default"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses by Category */}
        <div className="card">
          <h3 className="text-lg font-bold text-secondary mb-4">
            Expenses by Category
          </h3>
          {categoryData.length > 0 ? (
            <ExpenseChart data={categoryData} type="pie" />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No expense data available
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h3 className="text-lg font-bold text-secondary mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {stats?.recentExpenses?.slice(0, 5).map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      expense.type === 'income'
                        ? 'bg-blue-100 text-accent-blue'
                        : 'bg-red-100 text-accent-red'
                    }`}
                  >
                    {expense.type === 'income' ? (
                      <TrendingUp size={20} />
                    ) : (
                      <TrendingDown size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-secondary">
                      {expense.title}
                    </p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      expense.type === 'income'
                        ? 'text-accent-blue'
                        : 'text-accent-red'
                    }`}
                  >
                    {expense.type === 'income' ? '+' : '-'}$
                    {expense.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h3 className="text-lg font-bold text-secondary mb-4">
          Category Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats?.byCategory || {}).map(([category, amount]) => (
            <div
              key={category}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-secondary">{category}</span>
                <span className="text-sm text-gray-500">
                  {(
                    (amount / (stats?.totalExpenses || 1)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <p className="text-xl font-bold text-primary">
                ${amount.toFixed(2)}
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${(amount / (stats?.totalExpenses || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;