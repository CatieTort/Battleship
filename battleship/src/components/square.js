import React, {Component} from 'react';

class Square extends Component {

    render(){

        return(
            <td className={this.props.isActive ? 'active' : 'cell'} id={this.props.id} cell={this.props.cell} onClick={this.props.onClick}>{this.props.cell}</td>
        )
    }
}

export default Square;
