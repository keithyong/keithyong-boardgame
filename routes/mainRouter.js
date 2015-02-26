var express = require('express'),
    fs = require('fs'),
    config = require('../config.js'),
    router = express.Router();


/* This code handles / route */
router.get('/', function(req, res) {
    res.render('index', {title: 'Board Game Selector'});
});

module.exports = router;
