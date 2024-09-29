import BishopBlack from './icons/bishop_black.svg?react';
import BishopWhite from './icons/bishop_white.svg?react';
import KingBlack from './icons/king_black.svg?react';
import KingWhite from './icons/king_white.svg?react';
import KnightBlack from './icons/knight_black.svg?react';
import KnightWhite from './icons/knight_white.svg?react';
import PawnBlack from './icons/pawn_black.svg?react';
import PawnWhite from './icons/pawn_white.svg?react';
import QueenBlack from './icons/queen_black.svg?react';
import QueenWhite from './icons/queen_white.svg?react';
import RookBlack from './icons/rook_black.svg?react';
import RookWhite from './icons/rook_white.svg?react';

type SVG = React.FC<React.ComponentProps<'svg'> & { title?: string }>;

// Define the types for chess pieces and positions
export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type Color = 'white' | 'black';

const pieceSymbols: Record<PieceType, { [key in Color]: SVG }> = {
    king: { white: KingWhite, black: KingBlack },
    queen: { white: QueenWhite, black: QueenBlack },
    rook: { white: RookWhite, black: RookBlack },
    bishop: { white: BishopWhite, black: BishopBlack },
    knight: { white: KnightWhite, black: KnightBlack },
    pawn: { white: PawnWhite, black: PawnBlack },
};

type PieceProps = {
    type: PieceType;
    color: Color;
};

export const Piece = ({ type, color }: PieceProps): React.ReactElement => {
    const SVG = pieceSymbols[type][color];
    return <SVG />;
};
