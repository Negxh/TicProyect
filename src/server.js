// Librerias
// npm install express path express-handlebars method-override express-session
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

const http = require('http');

// Inticializacion
const app = express();

const server = http.Server(app);

// Settings 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    defaultLayouts: 'index',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialaDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//Mqtt
var io = require('socket.io')(server);

io.on('connect', function (socket) {
    console.log('User conectado');

    socket.on('message', function (data) {
        console.log(data);
        io.emit('message', data);
    });
})

// Global variables


//Module ESP8266 conection


// Routes
app.use(require('./routes/apiClima.routes'));


// Static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;