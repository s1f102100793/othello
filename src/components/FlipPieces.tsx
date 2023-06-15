import React, { useEffect } from 'react';

type CellColor = 'B' | 'W' | null;

type FlipPiecesProps = {
  row: number;
  col: number;
  board: CellColor[][];
  turn: CellColor;
  setBoard: React.Dispatch<React.SetStateAction<CellColor[][]>>;
};

const FlipPieces: React.FC<FlipPiecesProps> = ({ row, col, board, turn, setBoard }) => {
  const size = board.length;

  const directions: [number, number][] = [
    [0, 1], // 右
    [0, -1], // 左
    [1, 0], // 下
    [-1, 0], // 上
    [1, 1], // 右下
    [-1, -1], // 左上
    [1, -1], // 左下
    [-1, 1], // 右上
  ];

 
  useEffect(() => {
    const flipPieces = () => {
      const newBoard = [...board];

      for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let foundOpponent = false;
        const piecesToFlip: [number, number][] = [];

        while (x >= 0 && x < size && y >= 0 && y < size) {
          if (board[x][y] === null) {
            break;
          }
          if (board[x][y] !== turn) {
            foundOpponent = true;
            piecesToFlip.push([x, y]);
          } else if (board[x][y] === turn && foundOpponent) {
            for (const [flipRow, flipCol] of piecesToFlip) {
              newBoard[flipRow][flipCol] = turn;
            }
            break;
          } else {
            break;
          }
          x += dx;
          y += dy;
        }
      }

      newBoard[row][col] = turn;
      setBoard(newBoard);
    };

    flipPieces();
  }, [row, col, board, turn, setBoard]);

  return null;
};

export default FlipPieces;
