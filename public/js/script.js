// TODO: Checkbox does not work property
// TODO: Maybe do a 'Show more info' instead of giving an infodump

var initialGamesToShowOnLoad = 10;
var initialLoadURL = '/games?games=' + initialGamesToShowOnLoad;
var App = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            failure: function(xhr, status, err) {
                console.err(url, status, err.toString());
            }
        });
    },
    handleFilterSubmit: function(params) {
        // Generate GET URL based on data given by user!
        var url = '/games?games=9999';
        url += '&time=' + params.playTime;
        url += '&players=' + params.numPlayers;
        if (params.sortBy === 'average') {
            url += '&sortbyaverage';
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            failure: function(xhr, status, err) {
                console.err(url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="app">
                <h1>Board Game Finder</h1>
                <p>Built on React.js and CSS Flexbox!</p>
                <h3>Filter By:</h3>
                <FilterForm onFilterSubmit={this.handleFilterSubmit}/>
                <FilterResults data={this.state.data}/>
            </div>
        );
    }
});

var FilterForm = React.createClass({
    getInitialState: function() {
        return {sortBy: 'average'}
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var numPlayers = this.refs.numPlayers.getDOMNode().value;
        var playTime = this.refs.playTime.getDOMNode().value;
        var sortBy = this.state.sortBy;
        if (!numPlayers || !playTime) {
            return;
        }
        // Pass form data to parent, which is the App
        this.props.onFilterSubmit({numPlayers: numPlayers, playTime: playTime, sortBy: sortBy});
    },
    handleSelectChange: function(e) {
        this.setState({sortBy: e.target.value});
        console.log(this.state.sortBy);
    },
    render: function() {
        return(
            <form className="filterForm" onChange={this.handleSubmit} onSubmit={this.handleSubmit}>
                <label for="numPlayers">Number of Players: </label>
                <input id="numPlayers" type="number" ref="numPlayers" /><br></br>
                <label for="playTime">How much time you have to play: </label>
                <input id="playTime" type="number" ref="playTime"/><br></br>
                <label for="sortBy">Sort by: </label>
                <select id="sortBy" onChange={this.handleSelectChange}>
                    <option value="average">Average Rating</option>
                    <option value="random">Randomized</option>
                </select><br />
                <input type="submit" value="Submit"/><br></br>
            </form>
        );
    }
});

var FilterResults = React.createClass({
    render: function() {
        if (this.props.data.length === 0) {
            return (
                <div className="filterResults">
                    No results found.
                </div>
            );
        } else {
            var results = 0;
            var boardGameNodes = this.props.data.map(function(boardGame) {
                results++;
                return (
                    <BoardGame 
                    boardGameName={boardGame.objectname}
                    minPlayers={boardGame.minplayers}
                    maxPlayers={boardGame.maxplayers}
                    playTime={boardGame.playingtime}
                    averageRating={boardGame.average}
                    //description={boardGame.description}
                    thumbnailURL={boardGame.thumbnail}
                    />
                );
            });
        
            return (
                <div>
                <p>Found {results} results:</p>
                <div className="filterResults">
                    {boardGameNodes}
                </div>
                </div>
            );
        }
    }
});

var BoardGame = React.createClass({
    render: function() {
        return (
            <div className="boardGame">
                <h3 className="boardGameName">{this.props.boardGameName}</h3>
                <p className="description"><i>{this.props.description}</i></p>
                <p>Average Rating: <span className="averageRating">{this.props.averageRating}</span></p>
                <p>Players: <span className="minPlayers">{this.props.minPlayers}</span>-<span className="maxPlayers">{this.props.maxPlayers}</span></p>
                <p>Playing Time: <span className="playTime">{this.props.playTime}</span> minutes</p>
                <img src={this.props.thumbnailURL} alt="boardgameimage"></img>
            </div>
        );
    }
});

React.render(
    <App url={initialLoadURL}/>,
    document.getElementById('content')
);
