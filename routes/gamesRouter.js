var express = require('express'),
    fs = require('fs'),
    config = require('../config.js'),
    sqliteQuery = require('../sqliteQuery.js'),
    router = express.Router();

/* This code handles /games/ */
router.get('/', function(req, res) {
    var query = '';
    query = 'SELECT * FROM games';
    if (typeof req.query.players !== 'undefined') {
        query += ' WHERE minplayers<=' + req.query.players + ' AND ' + 'maxplayers>=' + req.query.players;
    }
    console.log(query);
    sqliteQuery(query, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
