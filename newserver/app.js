var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routers/users');
var optionsRouter = require('./routers/options');
var securitiesRouter = require('./routers/securities');
var membersRouter = require('./routers/members');
var app = express();
//var server = require('http').createServer(app);



//app.get('/', (req, res) => {
//    res.send('Hello world')
//});

var cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4201"); // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
}
app.use(cors());


app.use('/users', usersRouter);
app.use('/options', optionsRouter);
app.use('/securities', securitiesRouter);
app.use('/members', membersRouter);

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
    res.render('error');
});

module.exports = app;
