import React, { useState, useEffect } from 'react'; 
import './OthelloBoard.css';

enum CellState {
  EMPTY,
  BLACK,
  WHITE
}

const initialBoard = Array(8).fill(null).map(() => 
  Array<CellState>(8).fill(CellState.EMPTY)
);

// const [highlightedBoard, setHighlightedBoard] = useState(initialBoard.map(row => row.map(() => false)));

// 初期状態で中央に4つの石を置く
initialBoard[3][3] = CellState.BLACK;
initialBoard[4][4] = CellState.BLACK;
initialBoard[3][4] = CellState.WHITE;
initialBoard[4][3] = CellState.WHITE;

const OthelloBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(CellState.BLACK); // 追加
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      alert("ゲーム終了");
    }
  }, [isGameOver]);

  const hasLegalMove = (turn: CellState) => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (canPlaceStone(x, y, turn)) {
          return true;
        }
      }
    }
    return false;
  };


  const handleCellClick = (x: number, y: number) => {
    // 石を置くことができるか判定する
    const canPlace = canPlaceStone(x, y, turn);
  
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
  
      // 次のターンに進む
    const nextTurn = turn === CellState.BLACK ? CellState.WHITE : CellState.BLACK;
    if (hasLegalMove(nextTurn)) {
      setTurn(nextTurn);
    } else {
      // 次のターンもパスされる場合
      if (hasLegalMove(turn)) {
        setTurn(nextTurn); // 強制的にターンを切り替える
      } else {
        // 両者とも置けない場合 -> ゲーム終了
        setIsGameOver(true);
      }
    }
  }
};

const canPlaceStone = (x: number, y: number, turn: CellState) => {
    if (board[y][x] !== CellState.EMPTY) {
      return false; // 既に石が置かれている場合は置けない
    }
  
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
  
    let canPlace = false;
  
    for (const [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;
      let opponentPiecesCount = 0;
  
      while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        if (board[ny][nx] === CellState.EMPTY) {
          break;
        }
        if (board[ny][nx] !== turn) {
          opponentPiecesCount++;
        } else if (board[ny][nx] === turn && opponentPiecesCount > 0) {
          canPlace = true; // 自分の石と挟んで1個以上相手の石がある場合は置ける
          break;
        } else {
          break;
        }
        nx += dx;
        ny += dy;
      }
  
      if (canPlace) {
        break;
      }
    }
  
    return canPlace;
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


  return (
    <div>
      <div className="othello-board">
        {board.map((row, y) => row.map((_, x) => renderCell(x, y)))}
      </div>
    </div>
  );
};




export default OthelloBoard;