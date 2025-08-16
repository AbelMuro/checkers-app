import {defineStore} from 'pinia';


/* 
    this is where i left off, i need to implement the logic for taking the opponents pieces
*/

const initialState = {
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
        current_turn: 'red'

}

const useBoardStore = defineStore('board', {
    state: () => ({
        board: initialState.board,
        legal_moves: initialState.legal_moves,
        player: initialState.player,
        piece_to_be_moved: initialState.piece_to_be_moved,
        current_turn: initialState.current_turn
    }),
    actions: {
        setPiece(piece) {
            this.piece_to_be_moved = piece;
        },
        createLegalSquares(column, row) {
            if(!this.piece_to_be_moved) return;

            if(this.current_turn === 'red'){
                if(this.board[row - 1] && this.board[row - 1][column - 1] === '')    // north west
                    this.legal_moves[row - 1][column - 1] = true;

                if(this.board[row - 1] && this.board[row - 1][column + 1] === '')    // north east
                    this.legal_moves[row - 1][column + 1] = true;
            }
            else if(this.current_turn === 'black'){
               if(this.board[row + 1] && this.board[row + 1][column - 1] === '')     // south west
                    this.legal_moves[row + 1][column - 1] = true;
            
                if(this.board[row + 1] && this.board[row + 1][column + 1] === '')    // south east
                    this.legal_moves[row + 1][column + 1] = true;
            }
        },
        movePiece(toColumn, toRow) {
            const pieceId = this.piece_to_be_moved.pieceId;
            const fromColumn = this.piece_to_be_moved.column;
            const fromRow = this.piece_to_be_moved.row;
            this.board[toRow][toColumn] = pieceId;
            this.board[fromRow][fromColumn] = '';
            this.piece_to_be_moved = initialState.piece_to_be_moved;
            this.legal_moves = initialState.legal_moves;
        },
        changeTurn() {
            this.current_turn = this.current_turn === 'red' ? 'black' : 'red';
        }
    }
})

export default useBoardStore;