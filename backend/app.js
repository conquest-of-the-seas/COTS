let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let bodyParser = require('body-parser')



let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* routers */
let basicDataRouter = require('./routes/BasicData');
app.use('/data',basicDataRouter);
let registerRouter = require('./routes/RegisterPlayer');
app.use('/register',registerRouter);
let articlesRouter = require('./routes/Articles');
app.use('/articles',articlesRouter);
let hangarRouter = require('./routes/Hangar');
app.use('/hangar',hangarRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
console.log("Express server listening on port 4004");