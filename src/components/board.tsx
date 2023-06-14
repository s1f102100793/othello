import React from 'react';
import Piece from './Piece';

const Board = () => {
  const boardSize = 8;
  const cellSize = 80;
  const boardWidth = boardSize * cellSize;
  const boardHeight = boardSize * cellSize;

  const boardStyle = {
    width: `${boardWidth}px`,
    height: `${boardHeight}px`,
    backgroundColor: 'green',
    border: '2px solid black',
    display: 'grid',
    gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
  };

  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const cellStyle = {
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          border: '1px solid black',
        };

        if ((row === 3 && col === 3) || (row === 4 && col === 4)) {
          cells.push(
            <div key={`${row}-${col}`} style={cellStyle}>
              <Piece color="black" />
            </div>
          );
        } else if ((row === 3 && col === 4) || (row === 4 && col === 3)) {
          cells.push(
            <div key={`${row}-${col}`} style={cellStyle}>
              <Piece color="white" />
            </div>
          );
        } else {
          cells.push(<div key={`${row}-${col}`} style={cellStyle}></div>);
        }
      }
    }
    return cells;
  };

  return <div style={boardStyle}>{renderCells()}</div>;
};

export default Board;
