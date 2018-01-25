import React, {Component} from 'react';

class Square extends Component {

    render(){

        return(
            <td className={this.props.status}
            id={this.props.id} onClick={this.props.onClick}>{this.props.value}</td>
        )
    }
}


export default Square;
