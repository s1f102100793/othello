import React, { useState } from 'react';
import Piece from './Piece';
// import NewPiece from './NewPiece';

const Board: React.FC = () => {
  const boardSize = 8;
  const cellSize = 80;
  const boardWidth = boardSize * cellSize;
  const boardHeight = boardSize * cellSize;

  const [currentTurn, setCurrentTurn] = useState<'black' | 'white'>('black');

  const boardStyle = {
    width: `${boardWidth}px`,
    height: `${boardHeight}px`,
    backgroundColor: 'green',
    border: '2px solid black',
    display: 'grid',
    gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
  };

  const handlePieceClick = (row: number, col: number) => {
    if (currentTurn === 'black') {
      setCurrentTurn('white');
    } else {
      setCurrentTurn('black');
    }
    console.log(`Clicked on piece at row ${row}, col ${col}`);
  };

  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const cellStyle = {
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          border: '1px solid black',
          position: 'relative' as 'relative',
        };

        const isCenterRow = row === Math.floor(boardSize / 2) - 1 || row === Math.floor(boardSize / 2);
        const isCenterCol = col === Math.floor(boardSize / 2) - 1 || col === Math.floor(boardSize / 2);

        if (isCenterRow && isCenterCol) {
          const pieceColor = row === Math.floor(boardSize / 2) - 1 ? 'black' : 'white';
          cells.push(
            <div key={`${row}-${col}`} style={cellStyle}>
              <Piece color={pieceColor} row={row} col={col} onClick={handlePieceClick} />
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {`${row}, ${col}`}
              </span>
            </div>
          );
        } else {
          cells.push(
            <div key={`${row}-${col}`} style={cellStyle}>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {`${row}, ${col}`}
              </span>
            </div>
          );
        }
      }
    }
    return cells;
  };

  return <div style={boardStyle}>{renderCells()}</div>;
};

export default Board;
