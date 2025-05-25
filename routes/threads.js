const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');

// Lista wątków
router.get('/', async (req, res) => {
  const threads = await Thread.find().sort({ createdAt: -1 });
  res.render('threads', { threads, user: req.session.user });
});

// Dodawanie wątku
router.post('/new', async (req, res) => {
  if (!req.session.user) return res.status(401).send('Musisz być zalogowany');
  const { title, content, tag } = req.body;
  await Thread.create({ title, content, tag, author: req.session.user });
  res.redirect('/threads');
});

module.exports = router;
