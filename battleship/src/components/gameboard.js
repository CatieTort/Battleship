import React, { Component } from 'react';

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            board: [],
            shipCount: 5
        }
    }

    componentWillMount(){
        this.setUpBoard();
    }

    setUpBoard() {
        let board = []

        for(let i = 0; i < 10; i++){
            board.push([])
            for(let j = 0; j < 10; j++){
                board[i][j] = false;
            }
        }
        //console.log(board);

        for (let i = 0; i < this.state.shipCount; i++){
            board = this.placeShip(board);
        }

        this.setState({board: board})
    }

    clickHandler(x,y){
        var newBoard = this.state.board
        newBoard [y][x] = this.state.ship
        this.setState({
            board: newBoard
        })
    }

    placeShip(board) {
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)

        if (board[col][row] ==  false){
            board[col][row] = true
        }

        // console.log(col, " by ", row, " = ", board[col][row]);
        return board;
    }

    createRow(row){
        var set = []
        for (let col = 0; col < 10; col++){
            let shipExist = "";
                if (this.state.board[col][row] == true) {
                    shipExist = "ship";
                }
            set.push(<td className="cell" id={`${col}_${row}`} key={`${col}_${row}`} onClick="this.clickHandler(col,row).bind(this)">{shipExist}</td>);
        }
        return set
    }

    createRows(){
        var rows = []
        for (let i = 0; i < 10; i++){
            rows.push(<tr key="{i}">{this.createRow(i)}</tr>);
        }
        return rows
    }

    render(){
            console.log(this.state.board);
        return (
            <div className="board-container">
                <table>
                    <tbody>
                            {this.createRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Board;
