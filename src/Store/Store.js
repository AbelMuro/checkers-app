import {defineStore} from 'pinia';
import {diagonalOneMoves, checkForMultiCaptureJumps, capturePieces} from './Traversal';


/* 
    this is where i left off, i need to continue implementing the multi take logic in the global store
    Once a piece has been moved, we will check if that piece an double take by checking its diagonals
    if a multi-take is possible, then the this.piece_can_multi_take property will be assigned 'true'

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
            current_turn: 'red'

        }),
    actions: {
        setPiece(piece) {
            this.piece_to_be_moved = piece;
        },
        createLegalSquares(column, row) {
            if(!this.piece_to_be_moved) return;
            
            diagonalOneMoves(this.board, this.legal_moves, this.current_turn, column, row);

        },
        movePiece(toColumn, toRow) {
            const pieceId = this.piece_to_be_moved.pieceId;
            const fromColumn = this.piece_to_be_moved.column;
            const fromRow = this.piece_to_be_moved.row;
            const newSquare = this.legal_moves[toRow][toColumn];

            //we move the piece first
            this.board[toRow][toColumn] = newSquare === 'promote' ? `${pieceId} queen` : pieceId;
            this.board[fromRow][fromColumn] = '';

            //we check to see if there are any captured pieces
            capturePieces(newSquare, this.board, toRow, toColumn)

            //we check to see if the piece can multi-take
            if(checkForMultiCaptureJumps(this.board, this.legal_moves, this.current_turn, toRow, toColumn)){
                this.piece_can_multi_take = true;
                return;
            }
                
            this.piece_to_be_moved = '';
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
            this.changeTurn();

        },
        changeTurn() {
            this.current_turn = this.current_turn === 'red' ? 'black' : 'red';
        }
    }
})

export default useBoardStore;