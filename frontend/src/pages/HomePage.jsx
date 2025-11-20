import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, PieChart, Shield, Smartphone } from 'lucide-react';
import Button from '../components/common/Button';

const HomePage = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Track Expenses',
      description: 'Monitor your spending habits and identify where your money goes',
    },
    {
      icon: PieChart,
      title: 'Visual Analytics',
      description: 'Beautiful charts and graphs to visualize your financial data',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and completely secure',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Access your expenses anywhere, anytime on any device',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Track Smart, <span className="text-primary">Spend Smarter</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take control of your finances with SpendWise. The simple, intuitive
              expense tracker that helps you save more and stress less.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline text-lg px-8 py-3">
                Sign In
              </Link>
            </div>

            {/* Hero Image/Illustration */}
            <div className="mt-16 relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-primary-light rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">💰</div>
                    <div className="text-2xl font-bold text-primary">$5,420</div>
                    <div className="text-sm text-gray-600">Total Balance</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <div className="text-2xl font-bold text-accent-blue">$8,200</div>
                    <div className="text-sm text-gray-600">Income</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">📉</div>
                    <div className="text-2xl font-bold text-accent-red">$2,780</div>
                    <div className="text-sm text-gray-600">Expenses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Everything You Need to Manage Your Money
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make expense tracking effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their expenses smarter
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Start Free Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;