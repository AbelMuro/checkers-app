import {defineStore} from 'pinia';
import {diagonalMoves, diagonalQueenMoves, diagonalTakes, traverseBoard, diagonalQueenTakes, checkDiagonalTakes, checkQueenDiagonalTakes} from './Functions/Traversal';
import {capturePieces} from './Functions/Capture';


/* 
    1) The player will click on one of the pieces on the checker board and this will trigger a 
       click event handler.

    2) The event handler will update the global store by calling setPiece() and createLegalSquares().
       setPiece() will update the 'piece_to_be_moved' property with the id, column and row of the piece
       createLegalSquares() will update the 'legal_moves' property with the squares that the piece can move into.
       Once the 'legal_moves' property has been updated, there will be white circles in certain squares in the board.
       These white circles will let the player know that the square is a legal square, and they can move the piece to that square

    3) At the same time, when we call createLegalSquares(), we also identify which pieces can be captured. We do this by calling 
       diagonalTakes(), this function will update the 'pieces_to_be_taken' property with the data of those pieces.
    
    4) Once the player clicks on one of the white circles on the board, we call movePiece(). This function will update the 'board'
       property by moving the piece to the specified square.
       We also traverse through the 'pieces_to_be_taken' property, capturing all the pieces on the board (this is only true if 'pieces_to_be_taken' is NOT empty)

    5) At this point, we call changeTurn() to update the 'current_turn' property. This function will change the turn from 'red' to 'black' or vice versa.

    6) Once all state updates are finished and the call stack is empty. A re-render will occur and the watcher will be called in the CheckerBoard.vue file

    7) The watcher will call checkForPossibleTakes(). This function will traverse through the board and identify the pieces that can be captured by the opposing pieces.
       The function will also update the 'pieces_must_take' property. Any piece stored in this property MUST capture the specified piece. At this point, another
       set of white circles will appear on the board.


    Note to self:

        The watcher in CheckerBoard.vue will NOT be called if the user clicks on the 'redo' and 'undo' buttons.
        If it was called, then it will cause unexpected bugs. So i had to implement a separate logic for these buttons.
*/ 


/* 
    this is where i left off, i need to test out if the AI can capture multiple pieces on the board
*/

[
    ['', '', '', '', '', '', 'black 12', ''],
    ['', '', '', '', '', '', '', '' ],
    ['', '', '', '', '', 'black 11', '', '' ],
    ['', '', '', '', '', '', '', '' ],
    ['', '', '', '', 'black 13', '', '', '' ],
    ['', '', '', 'red 1', '', '', '', '' ],
    ['', '', '', '', '', '', '', '' ],
    ['', '', '', '', '', '', '', '' ],
]

const useBoardStore = defineStore('board', {
    state: () => ({
            board: [
                ['', '', '', '', '', '', 'black 12', ''],
                ['', '', '', '', '', '', '', '' ],
                ['', '', '', '', '', 'black 11', '', '' ],
                ['', '', '', '', '', '', '', '' ],
                ['', '', '', '', 'black 13', '', '', '' ],
                ['', '', '', 'red 1', '', '', '', '' ],
                ['', '', '', '', '', '', '', '' ],
                ['', '', '', '', '', '', '', '' ],
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

            player_color: 'red',
            current_turn: 'red',
            difficulty: '',

            resign: false,

            piece_to_be_moved: '',
            piece_can_multi_take: false,
            pieces_must_take: [],
            pieces_to_be_taken: [],

            captured_pieces: {
                red: 0,
                black: 0
            },
            history: {
                past: [],
                future: [],
                time_traveling: '', 
            }
        }),
    actions: {
        setPlayerColor(color) {
            this.player_color = color
        },
        setDifficulty(diff){
            this.difficulty = diff;
        },
        setPiece(piece) {
            this.piece_to_be_moved = piece;
        },
        createLegalSquares() {
            if(!this.piece_to_be_moved) return;
            
            const column = this.piece_to_be_moved.column;
            const row = this.piece_to_be_moved.row;
            const currentPiece = this.board[row][column];
        
            this.resetLegalMoves();
            this.resetPiecesToBeTaken();

            diagonalTakes(currentPiece, this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);
            if(!this.pieces_to_be_taken.length)
                diagonalMoves(currentPiece, this.board, this.legal_moves, this.current_turn, column, row);            
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
            let piecesTaken = [];
            let pieceId = this.piece_to_be_moved.pieceId;
            const opposingColor = pieceId.includes('red') ? 'black' : 'red';

            this.history.time_traveling = '';

            //we capture any pieces, if there are no pieces to capture, then we simply move the piece    
            if(this.pieces_to_be_taken.length && newSquare.includes('take')){
                let piece, moveToSquare, currentLegalSquare;
                let jumps = newSquare[newSquare.length - 1];
                let previousJump = null;

                    for(let i = 1; i <= Number(jumps); i++){         
                        piece = this.pieces_to_be_taken.shift();
                        if(!piece) break;
                        moveToSquare = piece.newSquare;                                    // the new square for the piece that is capturing another piece
                        currentLegalSquare = this.legal_moves[moveToSquare.row][moveToSquare.column];
                        if(i === 1){
                            this.piece_can_multi_take = true;
                            this.board[piece.row][piece.column] = `${piece.pieceId} captured`;  //capture the piece
                            this.board[fromRow][fromColumn] = '';                            //we move the piece
                            this.board[moveToSquare.row][moveToSquare.column] = pieceId;     //to this square     
                            previousJump = {row: moveToSquare.row, column: moveToSquare.column}                       
                        }
                        else
                            setTimeout(() => {
                                if(previousJump)
                                    this.board[previousJump.row][previousJump.column] = '';
                                this.board[piece.row][piece.column] = `${piece.pieceId} captured`; //capture the piece
                                this.board[moveToSquare.row][moveToSquare.column] = pieceId; 
                                previousJump = {row: moveToSquare.row, column: moveToSquare.column};
                            }, 400)
                        piecesTaken.push(piece);

                        if(i === Number(jumps))
                            setTimeout(() => {
                                this.piece_can_multi_take = false;
                                if(currentLegalSquare.includes('promote'))
                                    this.board[moveToSquare.row][moveToSquare.column] = `${pieceId} queen`;   
                            }, 500)
                    }
            }
            else{
                this.board[toRow][toColumn] = newSquare.includes('promote') ? `${pieceId} queen` : pieceId;
                this.legal_moves[toRow][toColumn] = '';
                this.board[fromRow][fromColumn] = '';  
                piecesTaken = capturePieces(newSquare, this.board, this.pieces_to_be_taken);           //i may not need this method     
            }

            //we record the piece that moved
            this.history.past.push({
                from: {pieceId: '', column: fromColumn, row: fromRow},
                to: {pieceId, column: toColumn, row: toRow},
                piecesTaken,
                promotion: newSquare.includes('promote'),
            });

            this.captured_pieces[opposingColor] += piecesTaken.length;

            //we remove all future recorded moves
            while(this.history.future.length)
                this.history.future.pop();
                
            //we check to see if the piece can multi-take
            if(this.pieces_to_be_taken.length) {                   
                this.setPiece({
                    pieceId: this.board[toRow][toColumn],
                    column: toColumn,
                    row: toRow,
                })
            }
            else{ 
                this.resetPieceToBeMoved();
                this.resetLegalMoves();
                this.resetPiecesToBeTaken();
                this.resetPiecesMustTake();
                this.changeTurn();                
            }
        },
        AImovePiece(move){
            let firstPromotion = false;
            const from = move.from;
            const to = move.to;
            let pieceId = move.piece;
            const capture = move.capture;
            const AiColor = this.player_color === 'red' ? 'black' : 'red';
            const opposingColor = this.player_color;

            if(capture)
                this.board[capture.row][capture.col] = '';
            if((to.row === 0 || to.row === 7) && !pieceId.includes('queen')){
                firstPromotion = true;
                pieceId = `${pieceId} queen`;

            }

            this.board[from.row][from.col] = '';
            this.board[to.row][to.col] = pieceId;
                
            //we record the piece that moved
            this.history.past.push({
                from: {pieceId: '', column: from.col, row: from.row},
                to: {pieceId, column: to.col, row: to.row},
                piecesTaken: capture ? [{column: capture.col, row: capture.row, pieceId: capture.pieceId}] : [],
                promotion: firstPromotion,
            });

            this.captured_pieces[opposingColor] += 1;

            //we remove all future recorded moves
            while(this.history.future.length)
                this.history.future.pop();

            if(capture && pieceId.includes('queen') && checkQueenDiagonalTakes(this.board, AiColor, to.col, to.row)) return;
            if(capture && checkDiagonalTakes(this.board, AiColor, to.col, to.row)) return;
                
            this.changeTurn();
        },  
        undoMove(){
            const move = this.history.past.pop();
            if(!move) return;

            this.history.future.push(move);
            this.history.time_traveling = true;

            const from = move.from;
            const to = move.to;
            const promotion = move.promotion;            
            const pieceId = promotion ? `${to.pieceId.split(' ')[0]} ${to.pieceId.split(' ')[1]}` : to.pieceId;      
            let opposingColor;  
            let piecesTaken = move.piecesTaken;            

            this.board[from.row][from.column] = pieceId;
            this.board[to.row][to.column] = '';

            //if the current piece has taken pieces, we put those pieces back in the board
            piecesTaken.forEach((piece) => {
                this.board[piece.row][piece.column] = piece.pieceId; 
                opposingColor = piece.pieceId.includes('red') ? 'red' : 'black';
                this.captured_pieces[opposingColor]--; 
            });                

            this.resetPiecesMustTake();

            this.current_turn = pieceId.includes('red') ? 'red' : 'black';            
        },
        redoMove() {
            const move = this.history.future.pop();
            if(!move) return;

            this.history.past.push(move);
            this.history.time_traveling = true;

            const from = move.from;
            const to = move.to;
            const promotion = move.promotion                     
            const pieceId = promotion ? `${to.pieceId} queen` : to.pieceId;
            let piecesTaken = move.piecesTaken;
            let opposingColor;

            this.board[from.row][from.column] = '';
            this.board[to.row][to.column] = pieceId;

            //if the piece has taken other pieces, we re-take the pieces from the board
            piecesTaken.forEach((piece) => {
                this.board[piece.row][piece.column] = '';  
                opposingColor = piece.pieceId.includes('red') ? 'red' : 'black';
                this.captured_pieces[opposingColor]++;
            })

            this.resetPiecesMustTake();
            this.resetPiecesToBeTaken();
            this.resetLegalMoves();
            this.setPiece({
                pieceId,
                column: to.column,
                row: to.row
            });

            pieceId?.includes('queen') ? 
                diagonalQueenTakes(this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, to.column, to.row) : 
                diagonalTakes(pieceId, this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, to.column, to.row);

            if(this.pieces_to_be_taken.length)
                this.current_turn = pieceId.includes('red') ? 'red' : 'black';
            else
                this.current_turn = pieceId.includes('red') ? 'black' : 'red';
        },
        checkForPossibleTakes() {
            this.resetPiecesMustTake();
            this.resetPiecesToBeTaken();
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
                diagonalTakes(pieceId, this.board, this.legal_moves, this.pieces_to_be_taken, this.current_turn, column, row);

        },
        capturePiece(row, column) {
            this.board[row][column] = ''
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
        },
    }
})

export default useBoardStore;