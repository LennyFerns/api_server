// routes/api.js
const express = require('express');
const router = express.Router();

// Mock user data
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// GET /api/users - List all users
router.get('/users', (req, res) => {    
  res.json(users);
});

// POST /api/users - Create a new user
router.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = Date.now(); // Mock ID generation
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /api/users/:id - Get a specific user by ID
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// PUT /api/users/:id - Update a specific user by ID
router.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE /api/users/:id - Delete a specific user by ID
router.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
