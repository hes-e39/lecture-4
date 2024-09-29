import { type Color, Piece, type PieceType } from './Piece';
import { cn } from './utils';

// Initial placement of pieces
const initialPositions: { piece: PieceType; color: Color; position: [number, number] }[] = [
    { piece: 'king', color: 'black', position: [0, 0] },
    { piece: 'king', color: 'white', position: [7, 7] },
];

export const Square = (row: number, col: number) => {
    const isDark = (row + col) % 2 === 1;
    const piece = initialPositions.find(p => p.position[0] === row && p.position[1] === col);

    return (
        <div key={`${row}-${col}`} className={cn('flex items-center justify-center size-14', isDark ? 'bg-darkSquare' : 'bg-lightSquare')}>
            {piece && <Piece type={piece.piece} color={piece.color} />}
        </div>
    );
};

const DEFAULT_BOARD_SIZE = 8;

export const Board = ({ size = DEFAULT_BOARD_SIZE }) => {
    const board = [];
    for (let row = 0; row < size; row++) {
        const cols = [];
        for (let col = 0; col < size; col++) {
            cols.push(Square(row, col));
        }
        board.push(
            <div key={row} className="flex">
                {cols}
            </div>,
        );
    }
    return (
        <div className="flex justify-center">
            <div>{board}</div>
        </div>
    );
};
