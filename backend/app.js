let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let bodyParser = require('body-parser')
const secretKey = 'This Is My Secret Key';



let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// adding needed headers for cookies
app.use(function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(secretKey));
app.use(express.static(path.join(__dirname, 'public')));


/* routers */
let mapDataRouter = require('./routes/MapData');
app.use('/map',mapDataRouter);
let registerRouter = require('./routes/RegisterPlayer');
app.use('/register',registerRouter);
let loginRouter = require('./routes/LoginPlayer');
app.use('/login',loginRouter);
let articlesRouter = require('./routes/Articles');
app.use('/articles',articlesRouter);
let hangarRouter = require('./routes/Hangar');
app.use('/hangar',hangarRouter);
let cabinsRouter = require('./routes/Cabins');
app.use('/cabins',cabinsRouter);
let playerDataRouter = require('./routes/PlayerData');
app.use('/player',playerDataRouter);
let trainingRouter = require('./routes/TrainingGrounds');
app.use('/train',trainingRouter);

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