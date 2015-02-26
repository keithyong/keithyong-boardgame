var express = require('express'),
    path = require('path'),
    app = express(),
    gamesRouter = require('./routes/gamesRouter'),
    mainRouter = require('./routes/mainRouter'),
    port = 7999;

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/', mainRouter)
app.use('/games', gamesRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
