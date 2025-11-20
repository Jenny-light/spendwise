const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Expense = require('../models/Expense');
const connectDB = require('../config/db');

dotenv.config();

// Sample Users
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
  },
];

// Sample Expenses
const categories = [
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

const expenseTitles = {
  Food: ['Grocery Shopping', 'Restaurant Dinner', 'Coffee Shop', 'Fast Food'],
  Transportation: ['Gas', 'Uber Ride', 'Bus Pass', 'Car Maintenance'],
  Entertainment: ['Movie Tickets', 'Concert', 'Streaming Subscription', 'Video Games'],
  Shopping: ['Clothes', 'Electronics', 'Books', 'Home Decor'],
  Bills: ['Electricity', 'Internet', 'Phone Bill', 'Rent'],
  Healthcare: ['Doctor Visit', 'Pharmacy', 'Gym Membership', 'Dental'],
  Education: ['Course Fee', 'Books', 'Online Tutorial', 'Certification'],
  Travel: ['Flight Tickets', 'Hotel', 'Car Rental', 'Travel Insurance'],
  Other: ['Gift', 'Donation', 'Pet Supplies', 'Miscellaneous'],
};

const generateRandomExpenses = (userId, count = 20) => {
  const expenses = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const titles = expenseTitles[category];
    const title = titles[Math.floor(Math.random() * titles.length)];
    
    // Random date within last 90 days
    const date = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    
    // Random type (80% expense, 20% income)
    const type = Math.random() > 0.8 ? 'income' : 'expense';
    
    expenses.push({
      user: userId,
      title: type === 'income' ? 'Salary' : title,
      amount: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      category: type === 'income' ? 'Other' : category,
      type,
      date,
      description: `Sample ${type} for testing purposes`,
    });
  }

  return expenses;
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing database...');
    await User.deleteMany();
    await Expense.deleteMany();

    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(users);

    console.log('💰 Creating expenses...');
    const allExpenses = [];

    createdUsers.forEach((user) => {
      const userExpenses = generateRandomExpenses(user._id, 20);
      allExpenses.push(...userExpenses);
    });

    await Expense.insertMany(allExpenses);

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Test User Credentials:');
    console.log('Email: john@example.com');
    console.log('Password: password123');
    console.log('\nEmail: jane@example.com');
    console.log('Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();