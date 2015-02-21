var sqlite3 = require('sqlite3').verbose(),
    bggdb = new sqlite3.Database('bgg.sqlite');

module.exports = function(query, callback) {
    bggdb.serialize(function() {
        bggdb.all(query, function(err, rows) {
            if (err) {
                console.log('Error while querying: ' + err);
            } else {
                callback(null, rows);
            }
        });
    });
};
