module.exports = function(params) {
    var query = '',
        limit = '1',
        order = 'RANDOM()';

    query = 'SELECT * FROM games';
    if (typeof params.players !== 'undefined') {
        query += ' WHERE minplayers<=' + params.players + ' AND ' + 'maxplayers>=' + params.players;
    }
    if (typeof params.games != 'undefined') {
        limit = params.games;
    }
    if (typeof params.sortbyrank != 'undefined') {
        order = 'rank';
    }
    if (typeof params.sortbyaverage != 'undefined') {
        order = 'average DESC';
    }
    
    /* Shuffle results and limit by 1 */
    query += ' ORDER BY ' + order + ' LIMIT ' + limit;

    return query;
};
