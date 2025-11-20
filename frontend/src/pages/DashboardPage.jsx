import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your financial activity</p>
      </div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;