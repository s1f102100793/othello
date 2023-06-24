// import React, { useState } from 'react';
// import FlipPieces from './FlipPieces';

// type CellColor = 'B' | 'W' | null;

// const Board = () => {
//   const size = 8;

//   const initialBoard = Array(size).fill(null).map(() => Array(size).fill(null));

//   initialBoard[3][3] = 'B';
//   initialBoard[4][4] = 'B';
//   initialBoard[4][3] = 'W';
//   initialBoard[3][4] = 'W';
  
//   const [board, setBoard] = useState(initialBoard);
//   const [turn, setTurn] = useState('B');

//   const calculateScore = () => {
//     let blackCount = 0;
//     let whiteCount = 0;
  
//     for (let i = 0; i < size; i++) {
//       for (let j = 0; j < size; j++) {
//         if (board[i][j] === 'B') {
//           blackCount++;
//         } else if (board[i][j] === 'W') {
//           whiteCount++;
//         }
//       }
//     }
  
//     if (blackCount > whiteCount) {
//       return 'B';
//     } else if (whiteCount > blackCount) {
//       return 'W';
//     } else {
//       return 'Draw';
//     }
//   };
  

//   const handleClick = (row: number, col: number) => {
//     if (board[row][col] === null && isValidMove(row, col)) {
//         const newBoard = [...board];
//         newBoard[row][col] = turn;
//         setBoard(newBoard);
//         setTurn(turn === 'B' ? 'W' : 'B');
//     }
//   };

//   const isValidMove = (row: number, col: number): boolean => {
//     const directions: [number, number][] = [
//       [0, 1], // 右
//       [0, -1], // 左
//       [1, 0], // 下
//       [-1, 0], // 上
//       [1, 1], // 右下
//       [-1, -1], // 左上
//       [1, -1], // 左下
//       [-1, 1], // 右上
//     ];

//     for (const [dx, dy] of directions) {
//       let x = row + dx;
//       let y = col + dy;
//       let foundOpponent = false;

//       while (x >= 0 && x < size && y >= 0 && y < size) {
//         if (board[x][y] === null) {
//           break;
//         }
//         if (board[x][y] !== turn) {
//           foundOpponent = true;
//         } else if (board[x][y] === turn && foundOpponent) {
//           return true;
//         } else {
//           break;
//         }
//         x += dx;
//         y += dy;
//       }
//     }

//     return false;
// };

  
  
// const renderCell = (row: number, col: number) => {
//     const cellColor: CellColor = board[row][col];
  
//     let backgroundColor = 'green';
//     if (cellColor === 'B') {
//       backgroundColor = 'black';
//     } else if (cellColor === 'W') {
//       backgroundColor = 'white';
//     } else if (isValidMove(row, col)) {
//       backgroundColor = turn === 'B' ? 'darkgreen' : 'lightgreen';
//     }
  
//     return (
//       <button
//         key={`${row}-${col}`}
//         onClick={() => handleClick(row, col)}
//         style={{
//           width: '80px',
//           height: '80px',
//           backgroundColor,
//         }}
//       />

      
//     );
//   };
  

//   const renderRow = (i: number) => {
//     const row = [];
//     for (let j = 0; j < size; j++) {
//       row.push(renderCell(i, j));
//     }
//     return (
//       <div style={{ display: 'flex' }}>
//         {row}
//       </div>
//     );
//   }

//   const renderBoard = () => {
//     const rows = [];
//     for (let i = 0; i < size; i++) {
//       rows.push(renderRow(i));
//     }
//     return rows;
//   }

//   return (
//     <div style={{ width: '640px', height: '640px' }}>
//       {renderBoard()}
//     </div>
//   );
// }

// export default Board;
