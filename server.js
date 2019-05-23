const   http = require('http');
        express = require('express');
        path = require('path');
        mongoose = require('mongoose');
        bodyParser = require('body-parser');
        cookieParser = require('cookie-parser');
        passport = require('passport');
        session = require('express-session');

// Create global app object
const app = express();

//Connect to mongodb
// mongoose.connect ('mongodb://localhost:27017/schoolData', {useNewUrlParser: true});
const data = require('./config/config');
mongoose.connect(data.MongoURI, {useNewUrlParser: true});

//EJS
app.set('view engine', 'ejs');

//Setup morgan
app.use(require('morgan')('dev'));

//Setup bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize()); //USE PASSPORT
app.use(passport.session());

require('./models/University');
require('./models/Major');
require('./models/MajorUpdate');
require('./models/Search');
require('./models/User');
require('./config/passport')(passport);

let routes = require('./routes');
app.use('/', routes);
app.use((req, res, next)=> {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-requested-With, Content-Type, Accept, Authorization",
        );
        if (req.method === 'OPTION'){
                res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET")
                return res.status(200).json({});
        }
        next();
});

//Catch 404 Errors and forward them to error
app.use(function (req, res, next) {
        const err = new Error("Not Found");
        err.status = 404;
        next(err);
});

app.use (function (req, res, next) {
        res.status(error.status || 500);
        res.json({
                error: {
                        message: error.message
                }
        });
});

const server = http.Server(app);
server.listen(3009);









