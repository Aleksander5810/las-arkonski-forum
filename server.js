const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Połączenie z MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'tajnyklucz', resave: false, saveUninitialized: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routing
const userRoutes = require('./routes/users');
const threadRoutes = require('./routes/threads');

app.use('/users', userRoutes);
app.use('/threads', threadRoutes);

app.get('/', (req, res) => {
  res.redirect('/threads');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Forum działa na http://localhost:${PORT}`));
