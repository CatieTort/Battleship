import React, {Component} from 'react';
import Hit from './hit';
import Miss from './miss';

class ScoreBoard extends Component {

    render(){
        return(
            <div className="scoreboard-container">
                <div className="score-item1"><h2>Torpedoes:{this.props.torpedoes}</h2></div>
                <div><Hit /></div>
                <div><Miss /></div>
                <div className="score-item2"><h2>Ships:{this.props.shipCount}</h2></div>
            </div>
        )
    }
}

export default ScoreBoard;
