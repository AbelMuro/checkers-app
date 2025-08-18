export const diagonalOneMoves = (board, legal_moves, current_turn, column, row) => {
            if(current_turn === 'red'){
                if(board[row - 1] && board[row - 1][column - 1] === '')    // north west move
                    legal_moves[row - 1][column - 1] = row === 1 ? 'promote' : true;

                if(board[row - 1] && board[row - 1][column + 1] === '')    // north east move
                    legal_moves[row - 1][column + 1] = row === 1 ? 'promote' : true;

                if((board[row - 1] && board[row - 1][column - 1]?.includes('black')) &&   //north west take
                    (board[row - 2] && board[row - 2][column - 2] === ''))
                        legal_moves[row - 2][column - 2] = row === 2 ? 'promote' : 'take black north west';

                if((board[row - 1] && board[row - 1][column + 1]?.includes('black')) &&   //north east take
                    (board[row - 2] && board[row - 2][column + 2] === ''))
                        legal_moves[row - 2][column + 2] = row === 2 ? 'promote' : 'take black north east';
            }
            else if(current_turn === 'black'){
               if(board[row + 1] && board[row + 1][column - 1] === '')     // south west move
                    legal_moves[row + 1][column - 1] = row === 6 ? 'promote' : true;
            
                if(board[row + 1] && board[row + 1][column + 1] === '')    // south east move
                    legal_moves[row + 1][column + 1] = row === 6 ? 'promote' : true;

                if((board[row + 1] && board[row + 1][column - 1]?.includes('red')) &&  //south west take
                   (board[row + 2] && board[row + 2][column - 2] === ''))
                     legal_moves[row + 2][column - 2] = row === 5 ? 'promote' : 'take red south west';

                if((board[row + 1] && board[row + 1][column + 1]?.includes('red')) &&             //south east take
                   (board[row + 2] && board[row + 2][column + 2] === ''))   
                     legal_moves[row + 2][column + 2] = row === 5 ? 'promote' : 'take red south east';
            }
}

export const capturePieces = (newSquare, board, toRow, toColumn) => {
        if(newSquare === 'take red south west'){
            board[toRow - 1][toColumn + 1] = '';
            return true;
        }
        else if(newSquare === 'take red south east'){
            board[toRow - 1][toColumn - 1] = '';
            return true;
        }
        else if(newSquare === 'take black north west'){
            board[toRow + 1][toColumn + 1] = '';
            return true;
        }
        else if(newSquare === 'take black north east'){
            board[toRow + 1][toColumn - 1] = '';
            return true;
        }
        else 
            return false;
}

export const checkForMultiCaptureJumps = (board, legal_moves, current_turn, row, column) => {
        if(current_turn === 'red'){
            if((board[row - 1] && board[row - 1][column - 1]?.includes('black')) &&    //north west take
                (board[row - 2] && board[row - 2][column - 2] === '')){
                    //legal_moves[row - 2][column - 2] = row === 2 ? 'promote' : 'take black north west';
                    return true;
                }
            if((board[row - 1] && board[row - 1][column + 1]?.includes('black')) &&    //north east take
                (board[row - 2] && board[row - 2][column + 2] === '')){
                    //legal_moves[row - 2][column + 2] = row === 2 ? 'promote' : 'take black north east';
                    return true;
                }
                    
        }
        else if(current_turn === 'black'){
            if((board[row + 1] && board[row + 1][column - 1]?.includes('red')) &&       //south west take
                (board[row + 2] && board[row + 2][column - 2] === '')){
                    //legal_moves[row + 2][column - 2] = row === 5 ? 'promote' : 'take red south west';
                    return true;
                }
            if((board[row + 1] && board[row + 1][column + 1]?.includes('red')) &&       //south east take
                (board[row + 2] && board[row + 2][column + 2] === ''))  {
                    //legal_moves[row + 2][column + 2] = row === 5 ? 'promote' : 'take red south east';
                    return true
                }       
        }

        return false;
}