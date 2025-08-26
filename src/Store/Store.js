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
    this is where i left off, i fixed most of the bugs concerning the redo and undo functionality

    what i need to do is create another property in the object being assigned to 'history.past' array.
    this property will tell me if moving the piece will create a promotion
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
            resign: false,
            piece_to_be_moved: '',
            piece_can_multi_take: false,
            pieces_must_take: [],
            current_turn: 'red',
            pieces_to_be_taken: [],
            history: {
                past: [],
                future: [],
                time_traveling: '', 
            }
        }),
    actions: {
        setPiece(piece) {
            this.piece_to_be_moved = piece;
        },
        createLegalSquares() {
            if(!this.piece_to_be_moved) return;
            
            const column = this.piece_to_be_moved.column;
            const row = this.piece_to_be_moved.row;
        
            this.resetLegalMoves();
            this.resetPiecesToBeTaken();

            diagonalTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);
            if(!this.pieces_to_be_taken.length)
                diagonalMoves(this.board, this.legal_moves, this.current_turn, column, row);            
        },
        createLegalSquaresForQueen() {
            if(!this.piece_to_be_moved) return;

            const column = this.piece_to_be_moved.column;
            const row = this.piece_to_be_moved.row;

            this.resetLegalMoves();
            this.resetPiecesToBeTaken();

            diagonalQueenTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);
            if(!this.pieces_to_be_taken.length)
                diagonalQueenMoves(this.board, this.legal_moves, column, row);

        },
        movePiece(toColumn, toRow) {
            const fromColumn = this.piece_to_be_moved.column;
            const fromRow = this.piece_to_be_moved.row;
            const newSquare = this.legal_moves[toRow][toColumn];
            let pieceId = this.piece_to_be_moved.pieceId;
            pieceId = newSquare.includes('promote') ? `${pieceId} queen` : pieceId

            this.history.time_traveling = '';

            //we move the piece in the board
            this.board[toRow][toColumn] = pieceId;
            this.legal_moves[toRow][toColumn] = '';
            this.board[fromRow][fromColumn] = '';

            //we record the piece that moved
            this.history.past.push({
                from: {pieceId: '', column: fromColumn, row: fromRow},
                to: {pieceId, column: toColumn, row: toRow},
                legalMove: newSquare,
                piecesTaken: JSON.parse(JSON.stringify(this.pieces_to_be_taken)),
            });

            //we remove all future recorded moves
            while(this.history.future.length)
                this.history.future.pop();

            //we check to see if the piece has taken any other pieces 
            // (the following function will remove pieces from the board)
            capturePieces(newSquare, this.board, this.pieces_to_be_taken);
                
            //we check to see if the piece can multi-take
            if(this.pieces_to_be_taken.length) {                //this is the issue
                this.piece_can_multi_take = true;               //this will prevent any other pieces from being moved
                this.setPiece({
                    pieceId: this.board[toRow][toColumn],
                    column: toColumn,
                    row: toRow,
                })
            }
            else{
                this.piece_can_multi_take = false;    
                this.resetPieceToBeMoved();
                this.resetLegalMoves();
                this.resetPiecesToBeTaken();
                this.resetPiecesMustTake();
                this.changeTurn();                
            }
        },
        undoMove(){
            const move = this.history.past.pop();
            if(!move) return;

            this.history.future.push(move);
            this.history.time_traveling = 'undo';

            const from = move.from;
            const to = move.to;
            const legalMove = move.legalMove;
            const pieceId = to.pieceId;        
            let piecesTaken = move.piecesTaken;            

            this.board[from.row][from.column] = pieceId;
            this.board[to.row][to.column] = '';

            //if the current piece has taken pieces, we put those pieces back in the board
            if(piecesTaken.length){
                piecesTaken = JSON.parse(JSON.stringify(piecesTaken));
                const jump = legalMove[legalMove.length - 1];
                const n = piecesTaken.length - 1;
                for(let i = n; i >= n - Number(jump); i--){
                    if(!piecesTaken[i]) break;
                    this.board[piecesTaken[i].row][piecesTaken[i].column] = piecesTaken[i].pieceId;                        
                }
            }

            this.current_turn = pieceId.includes('red') ? 'red' : 'black';            
            this.setPiece({
                pieceId,
                column: from.column,
                row: from.row
            })

            pieceId.includes('queen') ? 
                this.createLegalSquaresForQueen() :
                this.createLegalSquares();
        },
        redoMove() {
            const move = this.history.future.pop();
            if(!move) return;

            this.history.past.push(move);
            this.history.time_traveling = 'redo';

            const from = move.from;
            const to = move.to;
            const legalMove = move.legalMove;            
            const pieceId = to.pieceId;
            const jump = Number(legalMove[legalMove.length - 1]);
            let piecesTaken = move.piecesTaken;

            this.board[from.row][from.column] = '';
            this.board[to.row][to.column] = pieceId;

            //if the piece has taken other pieces, we re-take the pieces from the board
            if(piecesTaken.length){
                for(let i = 0; i < jump; i++){
                    if(!piecesTaken[i]) break;
                    this.board[piecesTaken[i].row][piecesTaken[i].column] = '';              
                }
            }

            this.resetLegalMoves();
            if(jump < piecesTaken.length)
                this.current_turn = pieceId.includes('red') ? 'red' : 'black';
            else
                this.current_turn = pieceId.includes('red') ? 'black' : 'red';
        },
        checkForPossibleTakes() {
            this.resetPiecesMustTake();
            this.resetLegalMoves();          
              
            //this function will populate the 'pieces_must_take' array
            traverseBoard(this);        
            if(!this.pieces_must_take.length) return;

            //we get the first element in the array and use it as the current piece that must be moved
            const piece = this.pieces_must_take[0];
            const pieceId = piece.pieceId;
            const column = piece.column;
            const row = piece.row;

            this.setPiece({
                pieceId: piece.pieceId,
                column,
                row
            })
            pieceId?.includes('queen') ? 
                diagonalQueenTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row) : 
                diagonalTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);

        },
        changeTurn() {
            this.current_turn = this.current_turn === 'red' ? 'black' : 'red';
        },
        resignGame() {
            this.resign = true;
        },
        resetLegalMoves() {
            for(let r = 0; r <= 7; r++)
                for(let c = 0; c <= 7; c++)
                    this.legal_moves[r][c] = '';
        },
        resetPieceToBeMoved(){
            this.piece_to_be_moved = '';
        },
        resetPiecesToBeTaken() {
            this.pieces_to_be_taken = [];
        },
        updatePiecesMustTake(piece) {
            this.pieces_must_take = this.pieces_must_take.filter((currentPiece) => {
                return currentPiece.pieceId !== piece;
            })
        },
        resetPiecesMustTake() {
            this.pieces_must_take = [];
        }
    }
})

export default useBoardStore;