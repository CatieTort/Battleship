import React, {Component} from 'react';

class Square extends Component {

    render(){

        return(
            <td className={this.props.isActive ? 'active' : 'cell'} id={this.props.id} onClick={this.props.onClick}></td>
        )
    }
}

export default Square;
