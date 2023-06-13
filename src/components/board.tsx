import React from 'react';

const Board = () => {
  const boardSize = 8; // 盤面のサイズ
  const cellSize = 80; // マス目のサイズ
  const boardWidth = boardSize * cellSize; // 盤面の幅
  const boardHeight = boardSize * cellSize; // 盤面の高さ

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
        cells.push(<div key={`${row}-${col}`} style={cellStyle}></div>);
      }
    }
    return cells;
  };

  return <div style={boardStyle}>{renderCells()}</div>;
};

export default Board;
