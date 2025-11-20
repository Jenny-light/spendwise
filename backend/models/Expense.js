const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to User model
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Food',
        'Transportation',
        'Entertainment',
        'Shopping',
        'Bills',
        'Healthcare',
        'Education',
        'Travel',
        'Other',
      ],
    },
    type: {
      type: String,
      required: [true, 'Please specify expense type'],
      enum: ['expense', 'income'],
      default: 'expense',
    },
    date: {
      type: Date,
      required: [true, 'Please add a date'],
      default: Date.now,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
expenseSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);