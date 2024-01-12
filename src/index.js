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

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onClickEvent={() => handleClickEvent(i)}
      />
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Next Player: ${xIsNext ? 'X' : 'O'}`;

  return(
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
      {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}{renderSquare(3)}
      </div>
      <div className="board-row">
      {renderSquare(4)}{renderSquare(5)}{renderSquare(6)}{renderSquare(7)}
      </div>
      <div className="board-row">
      {renderSquare(8)}{renderSquare(9)}{renderSquare(10)}{renderSquare(11)}
      </div>
      <div className="board-row">
      {renderSquare(12)}{renderSquare(13)}{renderSquare(14)}{renderSquare(15)}
      </div>
    </div>
  );
};

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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], //rows
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14,], [3, 7, 11, 15], //columns
    [0, 5, 10, 15], [3, 6, 9, 12], //diagonals
  ];

  for (let line of lines) {
    const [a, b, c, d] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]){
      return squares[a]; //X or O
    }
  }

  return null;
}
