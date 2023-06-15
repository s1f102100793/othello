import React, { useState } from 'react';
import './OthelloBoard.css';

enum CellState {
  EMPTY,
  BLACK,
  WHITE
}

const initialBoard = Array(8).fill(null).map(() => 
  Array<CellState>(8).fill(CellState.EMPTY)
);

// 初期状態で中央に4つの石を置く
initialBoard[3][3] = CellState.BLACK;
initialBoard[4][4] = CellState.BLACK;
initialBoard[3][4] = CellState.WHITE;
initialBoard[4][3] = CellState.WHITE;

const OthelloBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(CellState.BLACK); // 追加

  const handleCellClick = (x: number, y: number) => {
    // 石を置くことができるか判定する
    const canPlace = canPlaceStone(x, y);
  
    if (canPlace) {
      // 新しい状態を生成してsetBoardで更新する
      const newBoard = [...board];
      newBoard[y][x] = turn; // 現在のターンの色の石を配置する
  
      // TODO: 石を挟んでひっくり返す処理を追加する
      // 石を挟んでひっくり返す処理
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

      for (const [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        let hasOpponentPiece = false;
        const piecesToFlip: [number, number][] = [];

        while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
          if (board[ny][nx] === CellState.EMPTY) {
            break;
          }
          if (board[ny][nx] !== turn) {
            hasOpponentPiece = true;
            piecesToFlip.push([ny, nx]);
          } else if (board[ny][nx] === turn && hasOpponentPiece) {
            for (const [flipY, flipX] of piecesToFlip) {
              newBoard[flipY][flipX] = turn;
            }
            break;
          } else {
            break;
          }
          nx += dx;
          ny += dy;
        }
      }

      setBoard(newBoard);
  
      // ターンを切り替える
      setTurn(turn === CellState.BLACK ? CellState.WHITE : CellState.BLACK);
    }
  };

  const canPlaceStone = (x: number, y: number) => {
    // 石を置くことができるか判定するロジックを実装する
    // 自分の色の石で相手の石が1個以上挟める場所を判定する
  
    // TODO: 石を置くことができるか判定する処理を実装する
  
    return true; // 仮の実装として常にtrueを返す
  };

  const renderCell = (x: number, y: number) => {
    const cellState = board[y][x];
    let cellContent;
    if (cellState === CellState.BLACK) {
      cellContent = <div className="black"></div>;
    } else if (cellState === CellState.WHITE) {
      cellContent = <div className="white"></div>;
    } else {
      cellContent = null;
    }

    return (
      <div key={x} className="cell" onClick={() => handleCellClick(x, y)}>
        {cellContent}
      </div>
    );
  };


  return <div className="othello-board">{board.map((row, y) => row.map((_, x) => renderCell(x, y)))}</div>;
};



export default OthelloBoard;