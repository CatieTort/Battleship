import React, {Component} from 'react';

class Square extends Component {

    render(){

        return(
            <td className={this.props.isActive ? 'active' : 'cell'}
            // {this.props.isShip ? 'hit' : 'miss'}
            id={this.props.id} cellstate={this.props.cellstate} onClick={this.props.onClick}>{this.props.cellstate}</td>
        )
    }
}

export default Square;
