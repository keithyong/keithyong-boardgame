module.exports = function(params) {
    var query = '',
        where_clause = '',
        where_clauses = [],
        limit = '1',
        order = 'RANDOM()';

    query = 'SELECT * FROM games JOIN extra on games.objectid=extra.objectid';

    /* WHERE options */
    if (typeof params.players !== 'undefined') {
        where_clauses.push('minplayers<=' + params.players);
        where_clauses.push('maxplayers>=' + params.players);
    }
    if (typeof params.time != 'undefined') {
        where_clauses.push('playingtime<=' + params.time);
    }

    /* Generate WHERE clause */
    if (where_clauses.length !== 0) {
        where_clause = ' WHERE ';
        for (var i = 0; i < where_clauses.length; i++) {
            if (i == where_clauses.length - 1) {
                where_clause += where_clauses[i];
            } else {
                where_clause += where_clauses[i] + ' AND ';
            }
        }
    }
    
    /* Limit by number of games. Default is 1 */
    if (typeof params.games != 'undefined') {
        limit = params.games;
    }

    /* Sort by rank. I don't know how this is used but it's there. */
    if (typeof params.sortbyrank != 'undefined') {
        order = 'rank';
    }

    /* Sort by average descending */
    if (typeof params.sortbyaverage != 'undefined') {
        order = 'average DESC';
    }

    /* Shuffle results and limit by 1 */
    query += where_clause + ' ORDER BY ' + order + ' LIMIT ' + limit;

    return query;
};
