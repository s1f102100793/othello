import React from 'react';

type PieceProps = {
  color: string;
};

const Piece: React.FC<PieceProps> = ({ color }) => {
  const pieceStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: color,
    borderRadius: '50%',
  };

  return <div style={pieceStyle}></div>;
};

export default Piece;
