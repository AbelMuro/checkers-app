export const capturePieces = (newSquare, board, pieces_to_be_taken) => {
    if(!newSquare?.includes('take')) return [];

    const jumps = newSquare[newSquare.length - 1];
    let column;
    let row;
    let piece;
    let capturedPieces = [];

    for(let i = 1; i <= Number(jumps); i++){         
        piece = pieces_to_be_taken.shift();
        if(!piece) break;

        column = piece.column;
        row = piece.row;
        board[row][column] = '';
        capturedPieces.push(piece);
    }
    return capturedPieces;
}