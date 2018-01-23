import React, {Component} from 'react';

class Header extends Component {

    render(){
        return(
            <div className="header-container" >
                <div className='header-items'><h1>Battleship!</h1>
                <p>Find the ships and blow them out of the water</p>
                </div>
            </div>
        )
    }
}

export default Header;
