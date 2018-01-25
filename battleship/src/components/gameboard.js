import React, { Component } from 'react';
import Square from './square';
import ScoreBoard from './scoreboard';

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            board: [],
            status: [0,1,2,3],
            shipCount: 5,
            shipDetails: [
                {name: "Carrier", size: 5},
                {name: "Battleship", size: 4},
                {name: "Destroyer", size: 3},
                {name: "Submarine", size: 3},
                {name: "Frigate", size: 2},
            ],
            activeIndex: [],
            torpedoes: 50
        }
    }

    componentWillMount(){
        this.setUpBoard();
    }



    createCol(row){
    // let boardNum =
    var columns = []
    for (let col = 0; col < 10; col++){
    // console.log(this.state.board[col][row]);
    columns.push(<Square key={`${col}_${row}`} id={`${col}_${row}`}
        cell={this.state.board[col][row]}
        isActive={this.state.activeIndex.find((i) => {
            return i === `${col}_${row}`
        } ) }  onClick={this.clickHandler.bind(this)}/>);

        }
        return columns
    }

    createRows(){
        var rows = []
            for (let row = 0; row < 10; row++){
                rows.push(<tr key={`${row}`}>{this.createCol(row)}</tr>);
            }
            return rows
        }

    setUpBoard() {
        let board = []
        var boardNum = 0
        for(let i = 0; i < 10; i++){
            board.push([])
            for(let j = 0; j < 10; j++){
                board[i][j] = this.state.status[boardNum];
            }
        }
        console.log(board);

        for (let i = 0; i < this.state.shipCount; i++){
            board = this.placeShip(board, boardNum);
        }
        this.setState({board: board})
    }

    placeShip(board, boardNum) {
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)
        var cellState = this.state.status
        var shipCoor = this.state.shipDetails.map((i) =>{
            return i.size
        })
            if(board[col][row] == cellState[boardNum]){
               board[col][row] = cellState[boardNum + 1]
           }

        // console.log(col, " by ", row, " = ", board[col][row]);
        // console.log("status", cellState)
        // console.log(board);
        return board;
    }

    clickHandler(e){
        var cell = e.target.id
        var col = cell.split("_")[0]
        var row = cell.split("_")[1]
        console.log(e.target);
        console.log(col)
        console.log(row);
        var boardPlace = this.state.board[col][row]
        console.log("boardPlace",boardPlace);
        var shots = []
        shots.push(cell)
            this.setState({activeIndex: this.state.activeIndex.concat([cell])})
            this.userMoves(cell, boardPlace);
        // console.log(this.state.activeIndex);
    }

    userMoves(cell, boardPlace){
        var col = cell.split("_")[0]
        var row = cell.split("_")[1]
        var userClicks = this.state.activeIndex
        var cellState = this.state.status
        var userHits = this.state.activeIndex.length + 1
        var torpedoes = this.state.torpedoes
        console.log(cell);
        console.log("UserMoves:" , userHits)
        console.log("torpedoes:" , torpedoes)
            if (boardPlace === 0){
                this.state.board[col][row] = this.setState({cellState[3]})
                // BUG fix state change
                torpedoes --
                this.setState({torpedoes: torpedoes})
            } if (boardPlace === 1){
                cellState[boardPlace ++]
                torpedoes --
                this.setState({torpedoes: torpedoes})
            }if(userHits === 50){
                alert ("You Lose")
            }
            console.log("boardPlace",cellState[boardPlace]);
    }
    //FIXME: if the coordiates of a cell = a value inside the array do not subtract a torpedo.
    //4 possible states for each cell: empty, ship, miss, hit assign numbers to each within the grid
    // after click and no ship in the cell; cell changes from 0 to miss = 2 and one torpedo subtracted
    // if after click cell has ship = 1 then change cell to hit = 3 and one torpedo subtracted
    //if clicked cell = 2 or 3 no torpedoes subtracted




    // TODO: shipCoordiates needs to pull random coordiates that = the number of cells that is the length of each ship ex: Destroyer length is 3 needs 3 coordiates
    // all cells start empty = 0,
    // after ships are placed ship cells = 1


    render(){
            // console.log(this.state.board);
        return (
            <div>
            <div><ScoreBoard torpedoes={this.state.torpedoes} ships={this.state.shipCount}/></div>
            <div className="board-container">
                    <table>
                        <tbody>
                                {this.createRows()}
                        </tbody>
                    </table>
            </div>
        </div>
        )
    }
}

export default Board;
