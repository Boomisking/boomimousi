const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const clientPromise = require('./mongodb');


// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const expenses = await db.collection('expenses').find({}).toArray();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});


// Add a new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const expense = { ...req.body, createdAt: new Date() };
    const result = await db.collection('expenses').insertOne(expense);
    res.status(201).json({ ...expense, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});


// Delete an expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { ObjectId } = require('mongodb');
    await db.collection('expenses').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});


// Update an expense
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { ObjectId } = require('mongodb');
    const update = { $set: req.body };
    const result = await db.collection('expenses').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      update,
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Not found' });
    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
