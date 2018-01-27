import React, {Component} from 'react'
import { EMPTY, SHIP, HIT, MISS } from './gameboard'

class Square extends Component {

    render(){
        const { status, id, onClick } = this.props

        let className;

        switch (status) {
            case EMPTY:
                className = "cell"
                break;
            case SHIP:
                className = "ship"
                break;
            case MISS:
                className = "miss"
                break;
            case HIT:
                className = "hit"
                break;
            default:

        }

        return(<td
                id={id}
                className={className}
                onClick={onClick}>{status}
            </td>)
    }
}


export default Square;


//BUG: ships overlap
// ships go off board?
