import React from 'react';
import ExpenseList from '../components/expenses/ExpenseList';

const ExpensesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ExpenseList />
    </div>
  );
};

export default ExpensesPage;