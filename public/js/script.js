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
        var url = '/games?';
        url += '&games=' + params.numBoardGames;
        url += '&time=' + params.playTime;
        url += '&players=' + params.numPlayers;
        if (params.sortAvg === true) {
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
                <h3>Filter By:</h3>
                <FilterForm onFilterSubmit={this.handleFilterSubmit}/>
                <FilterResults data={this.state.data}/>
            </div>
        );
    }
});

var FilterForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var numPlayers = this.refs.numPlayers.getDOMNode().value;
        var numBoardGames = this.refs.numBoardGames.getDOMNode().value;
        var playTime = this.refs.playTime.getDOMNode().value;
        var sortAvg = this.refs.sortAvg.getDOMNode().checked;
        if (!numPlayers || !numBoardGames || !playTime) {
            return;
        }
        // Pass form data to parent, which is the App
        this.props.onFilterSubmit({numPlayers: numPlayers, numBoardGames: numBoardGames, playTime: playTime, sortAvg: sortAvg});
    },
    render: function() {
        return(
            <form className="filterForm" onSubmit={this.handleSubmit}>
                <label for="numPlayers">Number of Players: </label>
                <input id="numPlayers" type="number" ref="numPlayers" /><br></br>
                <label for="numBoardGames">Number of Board Games: </label>
                <input id="numBoardGames" type="number" ref="numBoardGames"/><br></br>
                <label for="playTime">How much time you have to play: </label>
                <input id="playTime" type="number" ref="playTime"/><br></br>
                <label for="sortAvg">Sort By Average?: </label>
                <input id="sortAvg" type="checkbox" ref="sortAvg"/><br></br>
                <input type="submit" value="Filter"/><br></br>
            </form>
        );
    }
});

var FilterResults = React.createClass({
    render: function() {
        boardGameNodes = this.props.data.map(function(boardGame) {
            return (
                <BoardGame 
                boardGameName={boardGame.objectname}
                minPlayers={boardGame.minplayers}
                maxPlayers={boardGame.maxplayers}
                playTime={boardGame.playingtime}
                />
            );
        });
        return (
            <div className="fiterResults">
                {boardGameNodes}
            </div>
        );
    }
});

var BoardGame = React.createClass({
    render: function() {
        return (
            <div className="boardGame">
                <h3 className="boardGameName">{this.props.boardGameName}</h3>
                <p className="minPlayers">{this.props.minPlayers}</p>
                <p className="maxPlayers">{this.props.maxPlayers}</p>
                <p className="playTime">{this.props.playTime}</p>
                <img alt="boardgameimage"></img>
            </div>
        );
    }
});

React.render(
    <App url={initialLoadURL}/>,
    document.getElementById('content')
);
