import React, { Component } from 'react';
import Square from './square';
import ScoreBoard from './scoreboard';

const EMPTY = 0
const SHIP = 1
const MISS = 2
const HIT = 3

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
            shotsRemaining: this.props.maxShots
        }
    }

    componentWillMount() {
        this.placeShips()
    }

    setUpBoard() {
        let board = []

        for(let row = 0; row < 10; row++){
            board.push([])
            for(let col = 0; col < 10; col++){
                board[row][col] = EMPTY
            }
        }

        console.log(board)

        return board
    }

    placeShips(board) {
        for (let i = 0; i < this.props.shipCount; i++){
            board = this.placeShip();
        }
    }

    placeShip() {
        const board = this.state.board

        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)

        // var shipCoor = this.state.shipDetails.map((i) =>{
        //     return i.size
        // })

        // TODO: when placing multiple ships this might stackoverflow

        if(board[row][col] === EMPTY) {
            board[row][col] = SHIP
        } else if(board[row][col] === SHIP) {
            this.placeShip()
        }

        // console.log(col, " by ", row, " = ", board[col][row]);
        // console.log(board);

        this.setState({
            board: board
        })
    }

    clickHandler(row, col){
        let { board, shotsRemaining } = this.state

        console.log(row)
        console.log(col);

        if (board[row][col] === EMPTY ){
            board[row][col] = MISS

            this.setState({
                shotsRemaining: shotsRemaining-1,
                board: board
            })
        } else if(board[row][col] === SHIP){
            board[row][col] = HIT

            this.setState({
                shotsRemaining: shotsRemaining-1,
                board: board
            })
        } else if(shotsRemaining <= 0){
            alert ("You Lose")
        }
        console.log(board);
    }

    //FIXME:
    //4 possible states for each cell: empty, ship, miss, hit assign numbers to each within the grid.
    // all cells start empty = 0,
    // after ships are placed ship cells = 1
    // after click and no ship in the cell; cell changes from 0 to miss = 2 and one torpedo subtracted
    // if after click cell has ship = 1 then change cell to hit = 3 and one torpedo subtracted
    //if clicked cell = 2 or 3 no shotsRemaining subtracted


    // TODO: shipCoordiates needs to pull random coordiates that = the number of cells that is the length of each ship ex: Destroyer length is 3 needs 3 coordiates
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
        const { shotsRemaining } = this.state
        return (
            <div>
                <div>
                    <ScoreBoard shotsRemaining={shotsRemaining} ships={0}/>
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
