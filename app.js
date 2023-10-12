var createError = require('http-errors');
const express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = 8000;
const app = express();



var loginRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var confirmoderinfoRouter = require('./routes/confirmoderinfo');
var userinfoRouter = require('./routes/userinfo');
var ordersRouter = require('./routes/orders');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Serve the "Meals" page
app.get('/menu', (req, res) => {
  res.render('menu'); // Render the "meals.ejs" template
});
// Serve the "Meals" page
app.get('/trays', (req, res) => {
  res.render('trays'); // Render the "meals.ejs" template
});
// Serve the "Meals" page
app.get('/meals', (req, res) => {
  res.render('meals'); // Render the "meals.ejs" template
});
// Serve the "Meals" page
app.get('/wings', (req, res) => {
  res.render('wings'); // Render the "meals.ejs" template
});
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000 // 24 hours
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', confirmoderinfoRouter);
app.use('/', userinfoRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // Check if the user is already on the root path to avoid redirect loop
  if (req.session.userId && req.path !== '/') {
    return res.redirect('/');
  }

  res.render('error');
});

module.exports = app;
