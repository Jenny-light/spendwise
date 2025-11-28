const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');

// @desc    Get all expenses for logged in user
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const { category, type, startDate, endDate, sort } = req.query;

  // Build query
  let query = { user: req.user._id };

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Filter by type (expense/income)
  if (type) {
    query.type = type;
  }

  // Filter by date range
  if (startDate || endDate) {
    query.date = {};
    if (startDate) {
      query.date.$gte = new Date(startDate);
    }
    if (endDate) {
      query.date.$lte = new Date(endDate);
    }
  }

  // Sort options
  let sortOption = { date: -1 }; // Default: newest first
  if (sort === 'oldest') {
    sortOption = { date: 1 };
  } else if (sort === 'highest') {
    sortOption = { amount: -1 };
  } else if (sort === 'lowest') {
    sortOption = { amount: 1 };
  }

  const expenses = await Expense.find(query).sort(sortOption);

  res.json(expenses);
});

// @desc    Get single expense
// @route   GET /api/expenses/:id
// @access  Private
const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    // Check if expense belongs to user
    if (expense.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this expense');
    }

    res.json(expense);
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, type, date, description } = req.body;

  // Validation
  if (!title || !amount || !category) {
    res.status(400);
    throw new Error('Please add title, amount, and category');
  }

  const expense = await Expense.create({
    user: req.user._id,
    title,
    amount,
    category,
    type: type || 'expense',
    date: date || Date.now(),
    description: description || '',
  });

  res.status(201).json(expense);
});

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  // Check if expense belongs to user
  if (expense.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this expense');
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.json(updatedExpense);
});

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  // Check if expense belongs to user
  if (expense.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this expense');
  }

  await expense.deleteOne();

  res.json({ message: 'Expense removed', id: req.params.id });
});

// @desc    Get expense statistics
// @route   GET /api/expenses/stats
// @access  Private
const getExpenseStats = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id, type: 'expense' });
  const income = await Expense.find({ user: req.user._id, type: 'income' });

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Group by category
  const byCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  // Recent expenses (last 5)
  const recentExpenses = await Expense.find({ user: req.user._id })
    .sort({ date: -1 })
    .limit(5);

  res.json({
    totalExpenses,
    totalIncome,
    balance,
    expenseCount: expenses.length,
    incomeCount: income.length,
    byCategory,
    recentExpenses,
  });
});

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
};