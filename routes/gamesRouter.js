var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.send('HI');
});

module.exports = router;
