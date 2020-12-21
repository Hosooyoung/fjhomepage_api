var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var http = require('http');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoRouter = require('./routes/info');
var boardRouter = require('./routes/board');
var mainRouter = require('./routes/main');
const cors = require('cors');
var app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(require('connect-history-api-fallback')());
var debug = require('debug')('svr:server');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'farmos',
    password: 'farmosv2@',
    database: 'fjbox_homepage'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info', infoRouter);
app.use('/board', boardRouter);
app.use('/main', mainRouter);
///////////////////sessionSet//////////////////////////////
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1200 * 60 * 60
    }
}));
// catch 404 and forward to error handler
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
/////////////create server///////////////////////////////////////////////
var port = normalizePort(process.env.PORT || '80');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

///////////////////////connect mysql///////////////////////////////////


connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

///////////////////////////////////////////////////////////////
/*module.exports = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../uploads/');
        },
        filename :(req,file,cb)=>{
            const originalFileName=file.originalname.split('.');
            let fileName='none';
            if(originalFileName.length>0){
                fileName='${originalFileName[0]}-$'
            }
        }
    })
}*/
function check_sleep_and_dead() {
    connection.query('SELECT * FROM users WHERE user_auth=0', function(err, list) {
        if (err) throw err;
        var date1 = new Date();

        for (i in list) {
            if (list[i].last_login != null) {
                var login_term = (date1.getTime() - list[i].last_login.getTime()) / (1000 * 60 * 60 * 24);
                if (login_term >= 364) {
                    connection.query('UPDATE users SET user_auth=2 where id=?', [list[i].id], function(err, row) {
                        if (err) throw err;
                        console.log("휴면적용대상 적용" + list[i].id);
                    })
                }
            }
        }
    })

};
let timerId = setInterval(() => check_sleep_and_dead(), 1000 * 60 * 60 * 24);
module.exports = app;