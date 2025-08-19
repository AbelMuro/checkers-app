import {defineStore} from 'pinia';
import {diagonalMoves, diagonalTakes, checkForMultiCaptureJumps, createLegalSquaresForMultiCapture, capturePieces} from './Traversal';


/* 
    this is where i left off, i need to refactor the multi-take logic in the global store, 
    im using recursion to find all possible multi take jumps and using a number N to identify each multi-jump
    in the legal_moves property of the global state

    now i need to use N to traverse through the pieces_to_be_taken array and remove the pieces 
    between 0 and N


*/

const useBoardStore = defineStore('board', {
    state: () => ({
            board: [
                ['black 9', '', 'black 10', '', 'black 11', '', 'black 12', ''],
                ['', 'black 5', '', 'black 6', '', 'black 7', '', 'black 8'],
                ['black 1', '', 'black 2', '', 'black 3', '', 'black 4', '',],
                ['', '', '', '', '', '', '', '',],
                ['', '', '', '', '', '', '', '',],
                ['', 'red 1', '', 'red 2', '', 'red 3', '', 'red 4',],
                ['red 5', '', 'red 6', '', 'red 7', '', 'red 8', ''],
                ['', 'red 9', '', 'red 10', '', 'red 11', '', 'red 12'],
            ],
            legal_moves: [
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
            ],
            player: 'red',
            piece_to_be_moved: '',
            piece_can_multi_take: false,
            current_turn: 'red',
            pieces_to_be_taken: [],
        }),
    actions: {
        setPiece(piece) {
            this.piece_to_be_moved = piece;
        },
        createLegalSquares(column, row) {
            if(!this.piece_to_be_moved) return;
        
            this.resetLegalMoves();
            diagonalMoves(this.board, this.legal_moves, this.current_turn, column, row);
            diagonalTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);
        },
        movePiece(toColumn, toRow) {
            const pieceId = this.piece_to_be_moved.pieceId;
            const fromColumn = this.piece_to_be_moved.column;
            const fromRow = this.piece_to_be_moved.row;
            const newSquare = this.legal_moves[toRow][toColumn];

            //we move the piece first
            this.board[toRow][toColumn] = newSquare.includes('promote') ? `${pieceId} queen` : pieceId;
            this.board[fromRow][fromColumn] = '';

            //we check to see if the piece has taken any pieces, and we also check if the piece can multi-take
            capturePieces(newSquare, this.board, toRow, toColumn)
                
            this.resetPieceToBeMoved();
            this.resetLegalMoves();
            this.changeTurn();

        },
        changeTurn() {
            this.current_turn = this.current_turn === 'red' ? 'black' : 'red';
        },
        resetLegalMoves() {
            this.legal_moves =  [
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
                ['', '', '', '', '', '' ,'', ''],
            ];
        },
        resetPieceToBeMoved(){
            this.piece_to_be_moved = '';
        }
    }
})

export default useBoardStore;