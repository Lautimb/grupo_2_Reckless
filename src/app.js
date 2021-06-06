const express = require('express');
const createError = require('http-errors');
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

const setLocals = require('./middlewares/setLocals');
const log = require('./middlewares/log');
const typeFilter = require('./middlewares/typeFilter');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const productsRouter = require('./routes/products');
const apiUsersRouter = require('./routes/api/users');
const apiProductsRouter = require('./routes/api/products');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares lvl aplication *-*
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'Reckless',
  resave: true,
  saveUninitialized: true
}));

app.use(log);
app.use(typeFilter);
app.use(setLocals);
app.use(cors())
// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);

// api routes 
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);


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
  res.render('error',{ error: err });
});





module.exports = app;

