# Board Game Geek game finder
Decide which board game to play!

## Supported API calls

Grab from the boardgames library.

`/games`

### /games options

`games` number of games to return.

`sortbyaverage` sort results by average rating on Board Game Geeks.

`players` only show games that can support X players.

## Examples

Grab a single random game

[`/games`](http://104.131.118.167:7999/games)

Grab twenty random games

[`/games?games=20`](http://104.131.118.167:7999/games?games=20)

Play a single random boardgame with 4 players

[`/games?players=4`](http://104.131.118.167:7999/games?players=4)

Grab 3 random games to play with 4 players

[`/games?games=3&players=4`](http://104.131.118.167:7999/games?games=3&players=4)

Play the highest averaged boardgame with 2 players

[`/games?players=2&sortbyaverage`](http://104.131.118.167:7999/games?players=2&sortbyaverage)

Play play the top four highest averaged boardgame with 6 players

[`/games?players=6&games=4&sortbyaverage`](http://104.131.118.167:7999/games?players=6&games=4&sortbyaverage)
