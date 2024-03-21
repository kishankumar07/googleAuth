// index.js

/*  EXPRESS */

const express = require('express');
const app = express();
const session = require('express-session');
let passport = require('passport')
const setupPassport = require('./passport');
require('dotenv').config();
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.use(passport.initialize());
app.use(passport.session());


setupPassport(); // Initialize Passport configuration

app.get('/', function(req, res) {
  res.render('pages/auth');
});

app.get('/success', (req, res) => res.render('pages/success', { user: req.user }));
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Server running at http://localhost:${port}`));


