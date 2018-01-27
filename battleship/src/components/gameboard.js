import React, { Component } from 'react';
import Square from './square';
import ScoreBoard from './scoreboard';

export const EMPTY = 0
export const SHIP = 1
export const MISS = 2
export const HIT = 3

const HORIZONTAL = 0
const VERTICAL = 1

const SHIPS = [
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
                board[row][col] = {
                    status: EMPTY
                }
            }
        }

        console.log(board)

        return board
    }

    checkArea(board, row, col, size, orientation){
        for(let i = 0; i < size; i++){
            // console.log(board);
            if(board[row][col].status === SHIP){
                return false
            }else if(orientation === HORIZONTAL){

                if(row + size >= 10){
                    return false
                }else if(board[row + i][col].status === SHIP){
                    return false
                }

            }else if (orientation === VERTICAL){

                if(col + size >= 10){
                    return false
                }else if(board[row][col + i].status === SHIP){
                    return false
                }

            }else{
                return true
            }
        }
    }

    placeShips() {
        const { board } = this.state

        for(let i = 0; i < SHIPS.length; i++){

            console.log("size:", SHIPS[i].size);

            this.placeShip(SHIPS[i])
        }

        // console.log("board:", board);
    }

    placeShip(ship) {
        const { board } = this.state

        var orientation = Math.floor(Math.random()*2)
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)

        console.log("orientation:",orientation);
        console.log("row:",row);
        console.log("col",col);

        // pull random coordiates that = the number of cells that is the length of each ship
        if(this.checkArea(board, row, col, ship.size, orientation) === false){
            return this.placeShip(ship)
        } else {
            for (let i = 0; i < ship.size; i++){
                if(orientation === HORIZONTAL){
                    board[row + i][col] = {
                        status: SHIP,
                        name: ship.name,
                        position: i
                    }
                } else {
                    board[row][col + i] = {
                        status: SHIP,
                        name: ship.name,
                        position: i
                    }
                }
            }
        }

        this.setState({
            board: board
        })
    }

    // sinkShip(board, row, col){
    //     var shipCoor = []
    //     //have: name & ship size & coordinates
    //     // If coordinates is equal to Hit then check which ship
    //     //Then how many hits that ship has received & compare to ship size
    //     if(SHIPS.size === 5){
    //         return "You sunk the " + SHIPS[i].name
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

        if (board[row][col].status === EMPTY ){
            board[row][col].status = MISS
        // after click and no ship in the cell; cell changes from 0 to miss = 2 and one torpedo subtracted
            this.setState({
                shotsRemaining: shotsRemaining-1,
                board: board
            })
        } else if(board[row][col].status === SHIP){
            board[row][col].status = HIT
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
            cols.push(
                <Square
                    id={row, col}
                    key={row, col}
                    status={board[row][col].status}
                    onClick={this.clickHandler.bind(this, row, col)}/>)
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
