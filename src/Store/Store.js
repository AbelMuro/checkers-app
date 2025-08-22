import {defineStore} from 'pinia';
import {diagonalMoves, diagonalQueenMoves, diagonalTakes, capturePieces, traverseBoard, diagonalQueenTakes} from './Traversal';


/* 
    1) The player will click on one of the pieces on the checker board and will trigger a 
       click event handler

    2) The event handler will update the global store by storing the data that identifies the 
       piece that was clicked on (color of the piece, ID of the piece, column and row of the piece)

    3) At this point, we call two functions that will find the legal squares that 
       the piece can move into. We populate the legal_moves array in the global store, and 
       if the piece can take other pieces, we populate the 'pieces_to_be_taken'
       array in the global store.

    4) If the player clicks on one of the squares in the board that is a legal square, we 
      update the board by moving the piece to that square. If another piece is taken in the process,
      then we empty out the 'pieces_to_be_taken' array by removing those pieces from the board
*/

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
        createLegalSquaresForQueen(column, row) {
            if(!this.piece_to_be_moved) return;

            this.resetLegalMoves();
            this.resetPiecesToBeTaken();

            diagonalQueenTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);
            if(!this.pieces_to_be_taken.length)
                diagonalQueenMoves(this.board, this.legal_moves, column, row);

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
            const pieceId = piece.pieceId;
            const column = piece.column;
            const row = piece.row;
            this.piece_to_be_moved = {
                pieceId: piece.pieceId,
                column,
                row
            }
            pieceId?.includes('queen') ? 
                diagonalQueenTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row) : 
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