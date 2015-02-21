var express = require('express'),
    path = require('path'),
    app = express(),
    dbmanager = require('./dbmanager.js'),
    gamesRouter = require('./routes/gamesRouter'),
    port = 7999;


var app = express();
app.use('/games', gamesRouter);
app.listen(port);
