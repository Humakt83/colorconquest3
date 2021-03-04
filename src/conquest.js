const ROWS = 10;
const COLUMNS = 10;

export function buildBoard() {
    const board = [];
    for (let y = 0; y < ROWS; y++) {
        const row = [];
        for (let x = 0; x < COLUMNS; x++) {
            row.push(0);
        }
        board.push(row);
    }
    board[0][0] = 1;
    board[1][0] = 1;
    board[0][1] = 1;
    board[9][9] = -1;
    board[8][9] = -1;
    board[9][8] = -1;
    return board;
}

