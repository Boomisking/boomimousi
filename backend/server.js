const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory expenses array (replace with DB in production)
let expenses = [];

// Get all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// Add a new expense
app.post('/api/expenses', (req, res) => {
  const expense = { id: Date.now(), ...req.body };
  expenses.push(expense);
  res.status(201).json(expense);
});

// Delete an expense
app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter(e => e.id !== id);
  res.status(204).end();
});

// Update an expense
app.put('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  expenses[index] = { ...expenses[index], ...req.body };
  res.json(expenses[index]);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
