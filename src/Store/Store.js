import {defineStore} from 'pinia';
import {diagonalMoves, diagonalTakes, capturePieces, traverseBoard} from './Traversal';


/* 
    this is where i left off, i need to start implementing the logic for the queen moves
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
            pieces_must_take: [],
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
            this.resetPiecesToBeTaken();

            diagonalTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);
            if(!this.pieces_to_be_taken.length)
                diagonalMoves(this.board, this.legal_moves, this.current_turn, column, row);
            
        },
        movePiece(toColumn, toRow) {
            const pieceId = this.piece_to_be_moved.pieceId;
            const fromColumn = this.piece_to_be_moved.column;
            const fromRow = this.piece_to_be_moved.row;
            const newSquare = this.legal_moves[toRow][toColumn];

            //we move the piece first
            this.board[toRow][toColumn] = newSquare.includes('promote') ? `${pieceId} queen` : pieceId;
            this.legal_moves[toRow][toColumn] = '';
            this.board[fromRow][fromColumn] = '';

            //we check to see if the piece has taken any pieces, and we also check if the piece can multi-take
            capturePieces(newSquare, this.board, this.pieces_to_be_taken);
                
            if(this.pieces_to_be_taken.length) {
                this.piece_can_multi_take = true;           //this will prevent any other pieces from being moved
                this.piece_to_be_moved = {
                    pieceId: this.board[toRow][toColumn],
                    column: toColumn,
                    row: toRow
                }
                return;
            }
            else
                this.piece_can_multi_take = false;            
 
            this.piece_to_be_moved = '';
            this.resetLegalMoves();
            this.resetPiecesToBeTaken();
            this.resetPiecesMustTake();
            this.changeTurn();

        },
        checkForPossibleTakes() {
            traverseBoard(this);
            if(!this.pieces_must_take.length) return;

            const piece = this.pieces_must_take[0];
            const column = piece.column;
            const row = piece.row;
            this.piece_to_be_moved = {
                pieceId: piece.pieceId,
                column,
                row
            }
            diagonalTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);

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
        },
        resetPiecesToBeTaken() {
            this.pieces_to_be_taken = [];
        },
        resetPiecesMustTake() {
            this.pieces_must_take = [];
        }
    }
})

export default useBoardStore;