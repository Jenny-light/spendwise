// Quick test to verify server setup
const express = require('express');
const app = express();

app.use(express.json());

// Test route
app.post('/api/auth/register', (req, res) => {
  console.log('✅ Test route hit!');
  res.json({ message: 'Route is working!', body: req.body });
});

app.get('/', (req, res) => {
  res.json({ message: 'Test server is running' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🧪 Test server running on port ${PORT}`);
  console.log(`   Try: POST http://localhost:${PORT}/api/auth/register`);
});

