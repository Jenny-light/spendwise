# 💰 SpendWise - Expense Tracker

![SpendWise Logo](https://via.placeholder.com/800x200/10B981/FFFFFF?text=SpendWise+-+Track+Smart,+Spend+Smarter)

A full-stack MERN (MongoDB, Express, React, Node.js) expense tracking application with authentication, data visualization, and responsive design.

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based registration and login
- 💸 **Expense Management** - Add, edit, delete expenses and income
- 📊 **Dashboard Analytics** - Visual charts and statistics
- 🔍 **Advanced Filtering** - Filter by category, type, date, and search
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Built with TailwindCSS
- ⚡ **Fast & Efficient** - Optimized performance

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

### Frontend
- React.js (Vite)
- React Router DOM
- TailwindCSS
- Recharts
- Axios
- Context API

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/spendwise.git
cd spendwise
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

Seed the database:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

## 👤 Demo Credentials
```
Email: john@example.com
Password: password123
```

## Live Demo Links

### Frontend : https://spendwise-flax.vercel.app/

### Backend : https://spendwise-cys3.onrender.com


## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Expenses
- `GET /api/expenses` - Get all expenses (Protected)
- `GET /api/expenses/:id` - Get single expense (Protected)
- `POST /api/expenses` - Create expense (Protected)
- `PUT /api/expenses/:id` - Update expense (Protected)
- `DELETE /api/expenses/:id` - Delete expense (Protected)
- `GET /api/expenses/stats` - Get statistics (Protected)

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#10B981` | Buttons, accents |
| Dark Green | `#059669` | Hover states |
| Light Green | `#D1FAE5` | Backgrounds |
| Dark Blue | `#1E293B` | Text, headers |
| Red | `#EF4444` | Expenses |
| Blue | `#3B82F6` | Income |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Jennifer Omoregie
- Email: jennnylightomoregie@gmail.com

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for backend hosting
- Vercel for frontend hosting
- All the amazing open-source libraries used in this project
