var express = require('express'),
    fs = require('fs'),
    config = require('../config.js'),
    router = express.Router();

router.get('/', function(req, res) {
    fs.readFile(config.bgg_json_file_name, 'utf8', function(err, data) {
        if (err) {
            console.log ('Error reading file ' + config.bgg_json_file_name + ': ' + err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

module.exports = router;
