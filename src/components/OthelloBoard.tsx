import React, { useState, useEffect } from "react";
import "./OthelloBoard.css";
enum CellState {
  EMPTY,
  BLACK,
  WHITE,
}
const initialBoard = Array(8)
  .fill(null)
  .map(() => Array<CellState>(8).fill(CellState.EMPTY));
initialBoard[3][3] = CellState.BLACK;
initialBoard[4][4] = CellState.BLACK;
initialBoard[3][4] = CellState.WHITE;
initialBoard[4][3] = CellState.WHITE;
const getStoneCounts = (board: CellState[][]) => {
  let blackCount = 0;
  let whiteCount = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === CellState.BLACK) {
        blackCount++;
      } else if (board[y][x] === CellState.WHITE) {
        whiteCount++;
      }
    }
  }
  return { blackCount, whiteCount };
};
const OthelloBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(CellState.BLACK);
  const [isGameOver, setIsGameOver] = useState(false);
  const [
    highlightedBoard,
    setHighlightedBoard,
  ] = useState(initialBoard.map((row) => row.map(() => false)));
  useEffect(() => {
    if (isGameOver) {
      const { blackCount, whiteCount } = getStoneCounts(board);
      let message = "ゲーム終了：";
      if (blackCount > whiteCount) {
        message += "黒の勝ち";
      } else if (whiteCount > blackCount) {
        message += "白の勝ち";
      } else {
        message += "引き分け";
      }
      alert(message);
    }
  }, [isGameOver, board]);
  useEffect(() => {
    updateHighlightedBoard();
  }, [board]);
  const resetGame = () => {
    const resetBoard = Array(8)
      .fill(null)
      .map(() => Array<CellState>(8).fill(CellState.EMPTY));
  
    resetBoard[3][3] = CellState.BLACK;
    resetBoard[4][4] = CellState.BLACK;
    resetBoard[3][4] = CellState.WHITE;
    resetBoard[4][3] = CellState.WHITE;
  
    setBoard(resetBoard);
    setTurn(CellState.BLACK);
    setIsGameOver(false);
    updateHighlightedBoard();
  };
  const updateHighlightedBoard = () => {
    const newHighlightedBoard = initialBoard.map((row) =>
      row.map(() => false)
    );
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (canPlaceStone(board, x, y, turn)) {
          newHighlightedBoard[y][x] = true;
        }
      }
    }
    setHighlightedBoard(newHighlightedBoard);
  };
  const hasLegalMove = (turn: CellState) => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (canPlaceStone(board, x, y, turn)) {
          return true;
        }
      }
    }
    return false;
  };
  const handleCellClick = (x: number, y: number) => {
    const canPlace = canPlaceStone(board, x, y, turn);
    if (canPlace) {
      const newBoard = [...board];
      newBoard[y][x] = turn;
      const directions: [number, number][] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
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
      const nextTurn = turn === CellState.BLACK ? CellState.WHITE : CellState.BLACK;
      if (hasLegalMove(nextTurn)) {
        setTurn(nextTurn);
      } else {
        if (hasLegalMove(turn)) {
          alert(nextTurn === CellState.BLACK ? "黒はパスです" : "白はパスです");
          updateHighlightedBoard();
        } else {
          setIsGameOver(true);
        }
      }
    }
  };
  const renderCell = (x: number, y: number) => {
    const cellState = board[y][x];
    const isHighlighted = highlightedBoard[y][x];
let cellContent;
    if (cellState === CellState.BLACK) {
      cellContent = <div className="black"></div>;
    } else if (cellState === CellState.WHITE) {
      cellContent = <div className="white"></div>;
    } else {
      cellContent = null;
    }
    const cellClassName = isHighlighted ? "cell highlighted" : "cell";
    return (
      <div key={x} className={cellClassName} onClick={() => handleCellClick(x, y)}>
        {cellContent}
      </div>
    );
  };
  const renderCurrentTurnAndStoneCounts = (
    turn: CellState,
    blackCount: number,
    whiteCount: number
  ) => {
    return `現在のターン：${
      turn === CellState.BLACK ? "黒" : "白"
    } 黒の数：${blackCount} 白の数：${whiteCount}`;
  };
  return (
    <div className="app-container">
      <div className="wrapper">
        <div className="othello-board">
          {board.map((row, y) => row.map((_, x) => renderCell(x, y)))}
        </div>
        <div className="turn-display">
          {renderCurrentTurnAndStoneCounts(
            turn,
            getStoneCounts(board).blackCount,
            getStoneCounts(board).whiteCount
          )}
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};
const canPlaceStone = (board: CellState[][], x: number, y: number, turn: CellState) => {
  if (board[y][x] !== CellState.EMPTY) {
    return false;
  }
  const directions: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
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
        canPlace = true;
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
export default OthelloBoard;