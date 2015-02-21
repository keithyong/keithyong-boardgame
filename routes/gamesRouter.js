var express = require('express'),
    fs = require('fs'),
    config = require('../config.js'),
    generateQuery = require('../generateQuery.js'),
    sqliteQuery = require('../sqliteQuery.js'),
    router = express.Router();


/* This code handles /games/ */
router.get('/', function(req, res) {
    var query = generateQuery(req.query);
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
