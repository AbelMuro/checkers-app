export const diagonalMoves = (board, legal_moves, current_turn, column, row) => {
            if(current_turn === 'red'){
                if(board[row - 1] && board[row - 1][column - 1] === '')    // north west move
                    legal_moves[row - 1][column - 1] = row === 1 ? 'promote' : 'legal move';

                if(board[row - 1] && board[row - 1][column + 1] === '')    // north east move
                    legal_moves[row - 1][column + 1] = row === 1 ? 'promote' : 'legal move';
            }
            else if(current_turn === 'black'){
               if(board[row + 1] && board[row + 1][column - 1] === '')     // south west move
                    legal_moves[row + 1][column - 1] = row === 6 ? 'promote' : 'legal move';
            
                if(board[row + 1] && board[row + 1][column + 1] === '')    // south east move
                    legal_moves[row + 1][column + 1] = row === 6 ? 'promote' : 'legal move';
            }
}

export const diagonalQueenMoves = (board, legal_moves, column, row) => {
        if(board[row - 1] && board[row - 1][column - 1] === '')    // north west move
            legal_moves[row - 1][column - 1] =  'legal move';

        if(board[row - 1] && board[row - 1][column + 1] === '')    // north east move
            legal_moves[row - 1][column + 1] = 'legal move';

        if(board[row + 1] && board[row + 1][column - 1] === '')     // south west move
            legal_moves[row + 1][column - 1] = 'legal move';
    
        if(board[row + 1] && board[row + 1][column + 1] === '')    // south east move
            legal_moves[row + 1][column + 1] =  'legal move';
}

export const diagonalTakes = (board, legal_moves, pieces_to_be_taken, current_turn, column, row, jumps = 1) => {

    if(current_turn === 'red'){
        if((board[row - 1] && board[row - 1][column - 1]?.includes('black')) &&         //north west take
            (board[row - 2] && board[row - 2][column - 2] === '')){
                legal_moves[row - 2][column - 2] = row === 2 ? `take black north west and promote ${jumps}` : `take black north west ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row - 1][column - 1], row: row - 1, column: column - 1});
                diagonalTakes(board, legal_moves, pieces_to_be_taken, current_turn, column - 2, row - 2, jumps + 1);
            }
                
        if((board[row - 1] && board[row - 1][column + 1]?.includes('black')) &&         //north east take
            (board[row - 2] && board[row - 2][column + 2] === '')){
                legal_moves[row - 2][column + 2] = row === 2 ? `take black north east and promote ${jumps}` : `take black north east ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row - 1][column + 1], row: row - 1, column: column + 1});
                diagonalTakes(board, legal_moves, pieces_to_be_taken, current_turn, column + 2, row - 2, jumps + 1);
            }
    }
    else if(current_turn === 'black'){
        if((board[row + 1] && board[row + 1][column - 1]?.includes('red')) &&           //south west take
            (board[row + 2] && board[row + 2][column - 2] === '')){
                legal_moves[row + 2][column - 2] = row === 5 ? `take red south west and promote ${jumps}` : `take red south west ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row + 1][column - 1], row: row + 1, column: column - 1});
                diagonalTakes(board, legal_moves, pieces_to_be_taken, current_turn, column - 2, row + 2, jumps + 1);
            }
        if((board[row + 1] && board[row + 1][column + 1]?.includes('red')) &&             //south east take
            (board[row + 2] && board[row + 2][column + 2] === '')) {
                legal_moves[row + 2][column + 2] = row === 5 ? `take red south east and promote ${jumps}` : `take red south east ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row + 1][column + 1], row: row + 1, column: column + 1});
                diagonalTakes(board, legal_moves, pieces_to_be_taken, current_turn, column + 2, row + 2, jumps + 1);
            }        
    }
}

export const diagonalQueenTakes = (board, legal_moves, pieces_to_be_taken, current_turn, column, row, jumps = 1) => {

    if(current_turn === 'red'){  
        if((board[row - 1] && board[row - 1][column - 1]?.includes('black')) &&         //north west take
            (board[row - 2] && board[row - 2][column - 2] === '') && !hasPieceAlreadyBeenChecked(board[row - 1][column - 1], pieces_to_be_taken)){
                legal_moves[row - 2][column - 2] = `take black north west ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row - 1][column - 1], row: row - 1, column: column - 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column - 2, row - 2, jumps + 1);
            }  
        if((board[row - 1] && board[row - 1][column + 1]?.includes('black')) &&         //north east take
            (board[row - 2] && board[row - 2][column + 2] === '') && !hasPieceAlreadyBeenChecked(board[row - 1][column + 1], pieces_to_be_taken)){
                legal_moves[row - 2][column + 2] = `take black north east ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row - 1][column + 1], row: row - 1, column: column + 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column + 2, row - 2, jumps + 1);
            }
        if((board[row + 1] && board[row + 1][column - 1]?.includes('black')) &&           //south west take
            (board[row + 2] && board[row + 2][column - 2] === '') && !hasPieceAlreadyBeenChecked(board[row + 1][column - 1], pieces_to_be_taken) ){
                legal_moves[row + 2][column - 2] = `take black south west ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row + 1][column - 1], row: row + 1, column: column - 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column - 2, row + 2, jumps + 1);
            }
        if((board[row + 1] && board[row + 1][column + 1]?.includes('black')) &&             //south east take
            (board[row + 2] && board[row + 2][column + 2] === '') && !hasPieceAlreadyBeenChecked(board[row + 1][column + 1], pieces_to_be_taken)) {
                legal_moves[row + 2][column + 2] = `take black south east ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row + 1][column + 1], row: row + 1, column: column + 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column + 2, row + 2, jumps + 1);
            }          
    }
    else if(current_turn === 'black'){
        if((board[row - 1] && board[row - 1][column - 1]?.includes('red')) &&         //north west take
            (board[row - 2] && board[row - 2][column - 2] === '') && !hasPieceAlreadyBeenChecked(board[row - 1][column - 1], pieces_to_be_taken)){
                legal_moves[row - 2][column - 2] = `take red north west ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row - 1][column - 1], row: row - 1, column: column - 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column - 2, row - 2, jumps + 1);
            }  
        if((board[row - 1] && board[row - 1][column + 1]?.includes('red')) &&         //north east take
            (board[row - 2] && board[row - 2][column + 2] === '') && !hasPieceAlreadyBeenChecked(board[row - 1][column + 1], pieces_to_be_taken)){
                legal_moves[row - 2][column + 2] = `take red north east ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row - 1][column + 1], row: row - 1, column: column + 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column + 2, row - 2, jumps + 1);
            }
        if((board[row + 1] && board[row + 1][column - 1]?.includes('red')) &&           //south west take
            (board[row + 2] && board[row + 2][column - 2] === '') && !hasPieceAlreadyBeenChecked(board[row + 1][column - 1], pieces_to_be_taken)){
                legal_moves[row + 2][column - 2] = `take red south west ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row + 1][column - 1], row: row + 1, column: column - 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column - 2, row + 2, jumps + 1);
            }
        if((board[row + 1] && board[row + 1][column + 1]?.includes('red')) &&             //south east take
            (board[row + 2] && board[row + 2][column + 2] === '') && !hasPieceAlreadyBeenChecked(board[row + 1][column + 1], pieces_to_be_taken)) {
                legal_moves[row + 2][column + 2] = `take red south east ${jumps}`;
                pieces_to_be_taken.push({pieceId: board[row + 1][column + 1], row: row + 1, column: column + 1});
                diagonalQueenTakes(board, legal_moves, pieces_to_be_taken, current_turn, column + 2, row + 2, jumps + 1);
            }   
    }
}

const hasPieceAlreadyBeenChecked = (piece, pieces_to_be_taken) => {
    return pieces_to_be_taken.some((currentPiece) => {
        return currentPiece.pieceId === piece;
    })
}

export const capturePieces = (newSquare, board, pieces_to_be_taken) => {
    if(!newSquare?.includes('take')) return;

    const jumps = newSquare[newSquare.length - 1];
    let column;
    let row;
    let piece;

    for(let i = 0; i < Number(jumps); i++){             /* the problem, is that the pieces_to_be_taken array is not being emptied here*/
        piece = pieces_to_be_taken.shift();
        if(!piece) break;

        column = piece.column;
        row = piece.row;
        board[row][column] = '';
    }
}

export const traverseBoard = (state) => {
    let currentPiece;

    for(let r = 0; r <= 7; r++){
        for(let c = 0; c <= 7; c++){
            currentPiece = state.board[r][c];
            const pieceColor = currentPiece.includes('red') ? 'red' : 'black';
            if(!currentPiece || pieceColor !== state.current_turn) continue;

            if(checkDiagonalTakes(state.board, pieceColor, c, r))
                state.pieces_must_take.push({pieceId: currentPiece, column: c, row: r});
        }
    }
}

export const checkDiagonalTakes = (board, piece_color, column, row) => {
    if(piece_color === 'red'){
        if((board[row - 1] && board[row - 1][column - 1]?.includes('black')) &&         //north west take
            (board[row - 2] && board[row - 2][column - 2] === ''))
                return true;       
        if((board[row - 1] && board[row - 1][column + 1]?.includes('black')) &&         //north east take
            (board[row - 2] && board[row - 2][column + 2] === ''))
                return true;
    }
    else if(piece_color === 'black'){
        if((board[row + 1] && board[row + 1][column - 1]?.includes('red')) &&           //south west take
            (board[row + 2] && board[row + 2][column - 2] === ''))
                return true;
            
        if((board[row + 1] && board[row + 1][column + 1]?.includes('red')) &&             //south east take
            (board[row + 2] && board[row + 2][column + 2] === '')) 
                return true;             
    }
    
    return false;
}