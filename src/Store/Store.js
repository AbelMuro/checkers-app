import {defineStore} from 'pinia';


/* 
    this is where i left off, i need to implement the logic for promoting pieces
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
            current_turn: 'red'

        }),
    actions: {
        setPiece(piece) {
            this.piece_to_be_moved = piece;
        },
        createLegalSquares(column, row) {
            if(!this.piece_to_be_moved) return;

            if(this.current_turn === 'red'){
                if(this.board[row - 1] && this.board[row - 1][column - 1] === '')    // north west move
                    this.legal_moves[row - 1][column - 1] = true;

                if(this.board[row - 1] && this.board[row - 1][column + 1] === '')    // north east move
                    this.legal_moves[row - 1][column + 1] = true;

                if((this.board[row - 1] && this.board[row - 1][column - 1]?.includes('black')) &&   //north west take
                    (this.board[row - 2] && this.board[row - 2][column - 2] === ''))
                        this.legal_moves[row - 2][column - 2] = 'take black north west';

                if((this.board[row - 1] && this.board[row - 1][column + 1]?.includes('black')) &&   //north east take
                    (this.board[row - 2] && this.board[row - 2][column + 2] === ''))
                        this.legal_moves[row - 2][column + 2] = 'take black north east';
            }
            else if(this.current_turn === 'black'){
               if(this.board[row + 1] && this.board[row + 1][column - 1] === '')     // south west move
                    this.legal_moves[row + 1][column - 1] = true;
            
                if(this.board[row + 1] && this.board[row + 1][column + 1] === '')    // south east move
                    this.legal_moves[row + 1][column + 1] = true;

                if((this.board[row + 1] && this.board[row + 1][column - 1]?.includes('red')) &&  //south west take
                   (this.board[row + 2] && this.board[row + 2][column - 2] === ''))
                     this.legal_moves[row + 2][column - 2] = 'take red south west';

                if((this.board[row + 1] && this.board[row + 1][column + 1]?.includes('red')) &&             //south east take
                   (this.board[row + 2] && this.board[row + 2][column + 2] === ''))   
                     this.legal_moves[row + 2][column + 2] = 'take red south east';
            }
        },
        movePiece(toColumn, toRow) {
            const pieceId = this.piece_to_be_moved.pieceId;
            const fromColumn = this.piece_to_be_moved.column;
            const fromRow = this.piece_to_be_moved.row;

            if(this.legal_moves[toRow][toColumn] === 'take red south west')
                this.board[toRow - 1][toColumn + 1] = '';
            else if(this.legal_moves[toRow][toColumn] === 'take red south east')
                this.board[toRow - 1][toColumn - 1] = '';
            else if(this.legal_moves[toRow][toColumn] === 'take black north west')
                this.board[toRow + 1][toColumn + 1] = '';
            else if(this.legal_moves[toRow][toColumn] === 'take black north east')
                this.board[toRow + 1][toColumn - 1] = '';


            this.board[toRow][toColumn] = pieceId;
            this.board[fromRow][fromColumn] = '';

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
        },
        changeTurn() {
            this.current_turn = this.current_turn === 'red' ? 'black' : 'red';
        }
    }
})

export default useBoardStore;