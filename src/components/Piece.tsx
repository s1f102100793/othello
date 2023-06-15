import React, { useState } from 'react';

type PieceProps = {
  color: 'black' | 'white';
  row: number; // マス目の行番号
  col: number; // マス目の列番号
  onClick: (row: number, col: number) => void;
};

const Piece: React.FC<PieceProps & { row: number; col: number }> = ({ color, row, col, onClick }) => {
  const [pieceColor, setPieceColor] = useState(color);

  const pieceStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: pieceColor,
  };

  const handleClick = () => {
    if (pieceColor === 'black') {
      setPieceColor('white');
    } else {
      setPieceColor('black');
    }
    onClick(row, col); // クリック時に親コンポーネントに位置情報を渡す
  };

  return <div style={pieceStyle} onClick={handleClick}></div>;
};

export default Piece;
