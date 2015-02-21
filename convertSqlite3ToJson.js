/* Script to grab bgg.sqlite file and convert it to a JSON in local directory.
 * Schema of games:
 * CREATE TABLE games (
 *     objectname text, 
 *     objectid integer, 
 *     average float, 
 *     avgweight float, 
 *     rank integer, 
 *     minplayers integer, 
 *     maxplayers integer, 
 *     playingtime integer, 
 *     bggbestplayers text
 *     ); */
var sqlite3 = require('sqlite3').verbose(),
    bggdb = new sqlite3.Database('bgg.sqlite'),
    query = 'SELECT * FROM games',
    fs = require('fs'),
    async = require('async'),
    filename = 'bgg.json';


var each = {},
    games_json = {
        games:{}
    };

/* Primary job is to simply grab sqlite3 file and convert it to a JSON,
 * however ugly that JSON is. */
function grab_from_db(callback) {
    bggdb.serialize(function() {
        bggdb.all(query, function(err, rows) {
            if (err) {
                console.log('Error running sqlite3 on games table: ' + err);
            } else {
                console.log('Successfully grabbed data from bgg.sqlite!');
                callback(null, rows);
            }
            return;
        });
    });
}

/* Make JSON less ugly! */
function format_json(json, callback) {
    /* formatted_json = {
     *     "Settlers of Catan" {
     *          objectid: 15232,
     *          average: 5.2332,
     *          avgweight: 2.3232,
     *          rank: 4,
     *          minplayers: 3,
     *          maxplayers: 4,
     *          playingtime: 90,
     *          bggbestplayers: '5-- 6-- 7'
     *     }
     * } */
    var formatted_json = {},
        individual_board_game = {},
        board_game_name;

    for (var i in json) {
        board_game_name = json[i].objectname;
        delete json[i].objectname;
        formatted_json[board_game_name] = json[i];
    }

    console.log('Finished formatting JSON!');
    callback(null, formatted_json);
}

/* Write JSON to file */
function write_json_to_file(json, callback) {
    fs.writeFile(filename, JSON.stringify(json, '  '), function(err) {
        if (err) {
            callback(err);
        } else {
            console.log('Successfully written JSON to ' + filename + '!');
            callback(null);
        }
    });
}

/* Thanks http://stackoverflow.com/a/25705318/529956 */
async.waterfall([
    grab_from_db,
    format_json,
    write_json_to_file
], function (error) {
    if (error) {
        console.log("Error: " + error);
    }
});

/* The above async.waterfall is the same as this:
 * grab_from_db(function(err, returned_json) {
    if (err) {
        console.log("Error grab_from_db: " + err);
    } else {
        format_json(returned_json, function(err, formatted_json) {
            if (err) {
                console.log("Error while formatting json: " + err);
            } else {
                write_json_to_file(formatted_json, function(err) {
                    if (err) {
                        console.log("Error writing formatted json to file!");
                    } else {
                        console.log(JSON.stringify(formatted_json, '  '));
                    }
                });
            }
        });
    }
});*/
