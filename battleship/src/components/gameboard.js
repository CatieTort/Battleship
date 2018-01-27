import React, { Component } from 'react';
import Square from './square';
import ScoreBoard from './scoreboard';

const EMPTY = 0
const SHIP = 1
const MISS = 2
const HIT = 3

const HORIZONTAL = 0
const VERTICAL = 1

const shipDetails = [
    {name: "Carrier", size: 5},
    {name: "Battleship", size: 4},
    {name: "Destroyer", size: 3},
    {name: "Submarine", size: 3},
    {name: "Frigate", size: 2},
]

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            board: this.setUpBoard(),
            shotsRemaining: this.props.maxShots,
            ships: this.props.shipCount
        }
    }

    componentWillMount() {
        this.placeShips()
    }
    //4 possible states for each cell: empty, ship, miss, hit assign numbers to each within the grid.
    // all cells start empty = 0,
    // after ships are placed ship cells = 1
    setUpBoard() {
        let board = []

        for(let row = 0; row < 10; row++){
            board.push([])
            for(let col = 0; col < 10; col++){
                board[row][col] = EMPTY
            }
        }

        // console.log(board)

        return board
    }

    checkArea(board, row, col, size, orientation){
        for(let i = 0; i < size; i++){
            // console.log(board);
            if(board[row][col] === SHIP){
                return false
            }else if(orientation === HORIZONTAL){

                if(row + size >= 10){
                    return false
                }else if(board[row + i][col] === SHIP){
                    return false
                }

            }else if (orientation === VERTICAL){

                if(col + size >= 10){
                    return false
                }else if(board[row][col + i] === SHIP){
                    return false
                }

            }else{
                return true
            }
        }
    }

    placeShips() {
        const { board } = this.state
        let size

        for(let i = 0; i < shipDetails.length; i++){
            size = shipDetails[i].size
            console.log("size:", size);
            this.placeShip(size)
        }
        console.log("board:", board);
    }

    placeShip(size) {
        const { board } = this.state

        var orientation = Math.floor(Math.random()*2)
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)
            console.log("orientation:",orientation);
            console.log("row:",row);
            console.log("col",col);
        let checkArea = this.checkArea(board, row, col, size, orientation)
        // pull random coordiates that = the number of cells that is the length of each ship
        if(checkArea === false){
            return this.placeShip(size)
        }else{

            for (let i = 0; i < size; i++){

                if(orientation === HORIZONTAL){
                    board[row + i][col] = SHIP
                }else{
                    board[row][col + i] = SHIP
                }
            }
        }
        // TODO: when placing multiple ships this might stackoverflow

        // if(board[row][col] === EMPTY) {
        //     board[row][col] = SHIP
        // } else if(board[row][col] === SHIP) {
        //     this.placeShip()
        // }

        // console.log(col, " by ", row, " = ", board[col][row]);
        // console.log(board);

        this.setState({
            board: board
        })
    }

    // sinkShip(board, row, col){
    //     var shipCoor = []
    //     //have: name & ship size & coordinates
    //     // If coordinates is equal to Hit then check which ship
    //     //Then how many hits that ship has received & compare to ship size
    //     if(shipDetails.size === 5){
    //         return "You sunk the " + shipDetails[i].name
    //     }
    //
    //     shipCoor.push([row,col])
    //     console.log("ShipCoor", shipCoor);
    //
    //
    //     for(let i = 0; i < size; i++){
    //         if (board[row][col + i] === HIT){
    //             // can only be run if orientation is V
    //             if(board[row = i][col]){
    //             // can only be run if orientation is H
    //             }
    //
    //         }else{
    //
    //         }
    //     }
    //
    // }


    clickHandler(row, col){
        let { board, shotsRemaining } = this.state

        // console.log(row)
        // console.log(col);

        if (board[row][col] === EMPTY ){
            board[row][col] = MISS
        // after click and no ship in the cell; cell changes from 0 to miss = 2 and one torpedo subtracted
            this.setState({
                shotsRemaining: shotsRemaining-1,
                board: board
            })
        } else if(board[row][col] === SHIP){
            board[row][col] = HIT
            // this.sinkShip(board, row, col)
        // if after click cell has ship = 1 then change cell to hit = 3 and one torpedo subtracted

            this.setState({
                shotsRemaining: shotsRemaining-1,
                board: board
            })
        } else if(shotsRemaining <= 0){
            alert ("You Lose")
        }
        // console.log(board);
    }


    renderCol(row) {
        const { board } = this.state

        var cols = []

        for (let col = 0; col < 10; col++){
            // console.log(this.state.board[row][col]);
            var status = ''
            let square = board[row][col]

            if ( square === HIT ){
                status = 'hit'
            }else if( square === MISS ){
                status = 'miss'
            }else if(square === SHIP){
                status = 'ship'
            }else{
                status = 'cell'
            }

            cols.push(
                <Square id={row, col} key ={row, col}
                    status={ status } value = { square }
                onClick={this.clickHandler.bind(this, row, col)}/>);

        }

        return cols
    }

    renderRows() {
        var rows = []

        for (let row = 0; row < 10; row++){
            rows.push(<tr key={`${row}`}>{this.renderCol(row)}</tr>);
        }

        return rows
    }

    render() {
        const { shotsRemaining, ships } = this.state
        return (
            <div>
                <div>
                    <ScoreBoard shotsRemaining={shotsRemaining} ships={ships}/>
                </div>
                <div className="board-container">
                    <table>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Board;
