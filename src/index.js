import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const Square = (props) => {
  return(
    <button 
      className="square"
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  );
};
//i feel like the array is useless now that there are 64 squares instead of 9
const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const newSquares = [...squares];

    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareFilled) {
      return;
    }
//dont know how or why, but it magically works
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
//i wanna understand this, but i dont
  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onClickEvent={() => handleClickEvent(i)}
      />
    );
  };
  //i dont even know what the fuck this is
  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Next Player: ${xIsNext ? 'X' : 'O'}`;
  //i wouldn't wish this torture not even on my worst enemies
  return(
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
      {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}{renderSquare(6)}{renderSquare(7)}
      </div>
      <div className="board-row">
      {renderSquare(8)}{renderSquare(9)}{renderSquare(10)}{renderSquare(11)}{renderSquare(12)}{renderSquare(13)}{renderSquare(14)}{renderSquare(15)}
      </div>
      <div className="board-row">
      {renderSquare(16)}{renderSquare(17)}{renderSquare(18)}{renderSquare(19)}{renderSquare(20)}{renderSquare(21)}{renderSquare(22)}{renderSquare(23)}
      </div>
      <div className="board-row">
      {renderSquare(24)}{renderSquare(25)}{renderSquare(26)}{renderSquare(27)}{renderSquare(28)}{renderSquare(29)}{renderSquare(30)}{renderSquare(31)}
      </div>
      <div className="board-row">
      {renderSquare(32)}{renderSquare(33)}{renderSquare(34)}{renderSquare(35)}{renderSquare(36)}{renderSquare(37)}{renderSquare(38)}{renderSquare(39)}
      </div>
      <div className="board-row">
      {renderSquare(40)}{renderSquare(41)}{renderSquare(42)}{renderSquare(43)}{renderSquare(44)}{renderSquare(45)}{renderSquare(46)}{renderSquare(47)}
      </div>
      <div className="board-row">
      {renderSquare(48)}{renderSquare(49)}{renderSquare(50)}{renderSquare(51)}{renderSquare(52)}{renderSquare(53)}{renderSquare(54)}{renderSquare(55)}
      </div>
      <div className="board-row">
      {renderSquare(56)}{renderSquare(57)}{renderSquare(58)}{renderSquare(59)}{renderSquare(60)}{renderSquare(61)}{renderSquare(62)}{renderSquare(63)}
      </div>
    </div>
  );
};
//literally the easiest thing of this entire code and its fucking retarded
const Game = () => {
  return (
    <div className="game">
      Tic Tac Toe
      <Board />
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
//spent literally an hour trying to get this all right
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29, 30, 31], [32, 33, 34, 35, 36, 37, 38, 39], [40, 41, 42, 43, 44, 45, 46, 47], [48, 49, 50, 51, 52, 53, 54, 55], [56, 57, 58, 59, 60, 61, 62, 63], //rows
    [0, 8, 16, 24, 32, 40, 48, 56], [1, 9, 17, 25, 33, 41, 49, 57], [2, 10, 18, 26, 34, 42, 50, 58], [3, 11, 19, 27, 35, 43, 51, 59], [4, 12, 20, 28, 36, 44, 52, 60], [5, 13, 21, 29, 37, 45, 53, 61], [6, 14, 22, 30, 38, 46, 54, 62], [7, 15, 23, 31, 39, 47, 55, 63], //columns
    [0, 9, 18, 27, 36, 45, 54, 63], [7, 14, 21, 28, 35, 42, 49, 56], //diagonals
  ];

  for (let line of lines) {
    const [a, b, c, d, e, f, g, h] = line;
//they all connect to [a] but not to eachother, how the fuck does this work?
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e] && squares[a] === squares[f] && squares[a] === squares[g] && squares[a] === squares[h]){
      return squares[a]; //X or O
    }
  }

  return null;
}
