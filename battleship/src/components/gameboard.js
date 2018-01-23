import React, { Component } from 'react';
import Square from './square';

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            board: [],
            shipCount: 5,
            activeIndex: [],
            torpedoes: 25
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

    userMoves(){
        var userHits = this.state.activeIndex.length + 1
        var torpedoes = this.state.torpedoes
        console.log("UserMoves:" , userHits)
        console.log("torpedoes:" , torpedoes)
        if (userHits < this.state.torpedoes){
            torpedoes --
            this.setState({torpedoes: torpedoes})
        }else if(userHits === 5){
            alert ("You Lose")
        }
    }

    clickHandler(e){
        var cell = e.target.id
        // console.log(cell);
        var shots = []
        shots.push(cell)
        this.setState({activeIndex: this.state.activeIndex.concat([cell])})
        this.userMoves();
        // console.log(this.state.activeIndex);
    }

    placeShip(board) {
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)

        if (board[col][row] ==  false){
            board[col][row] = true
        }
//TODO: ships are overlapping
        console.log(col, " by ", row, " = ", board[col][row]);
        return board;
    }

    createRow(row){
        var set = []
        for (let col = 0; col < 10; col++){
            let shipExist = "";
                if (this.state.board[col][row] == true) {
                    shipExist = "ship";
                }

            set.push(<Square key={`${col}_${row}`} id={`${col}_${row}`} isActive={this.state.activeIndex.find((i) => {
                return i === `${col}_${row}`
            } ) }  onClick={this.clickHandler.bind(this)}/>);

        }
        return set
    }

    createRows(){
        var rows = []
        for (let i = 0; i < 10; i++){
            rows.push(<tr key={`${i}`}>{this.createRow(i)}</tr>);
        }
        return rows
    }

    render(){
            // console.log(this.state.board);
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
