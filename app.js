var express = require('express'),
    path = require('path'),
    sqlite3 = require('sqlite3').verbose(),
    bggdb = new sqlite3.Database('bgg.sqlite'),
    app = express(),
    gamesRouter = require('./routes/gamesRouter'),
    port = 7999;

// SCHEMA
// CREATE TABLE games (objectname text, objectid integer, average float, avgweight float, rank integer, minplayers integer, maxplayers integer, playingtime integer, bggbestplayers text);
// SQLite3 read from bgg.sqlite
bggdb.serialize(function() {
    var each = {},
        games_json = {};
    bggdb.each('SELECT objectname as name, objectid as id FROM games', function(err, row) {
        if (err) {
            console.log("Error running sqlite3 on games table: " + err);
        } else {
            console.log(row);
            each.id = row.id;
            games_json[row.name] = each;
        }
    });
    console.log(JSON.stringify(games_json, '  '));
});
var app = express();
app.use('/games', gamesRouter);
app.listen(port);
