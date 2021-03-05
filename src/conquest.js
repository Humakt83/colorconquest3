const ROWS = 10;
const COLUMNS = 10;

export function buildBoard() {
    const board = [];
    for (let y = 0; y < ROWS; y++) {
        const row = [];
        for (let x = 0; x < COLUMNS; x++) {
            row.push('none');
        }
        board.push(row);
    }
    board[0][0] = 'blue';
    board[1][0] = 'blue';
    board[0][1] = 'blue';
    board[ROWS-1][COLUMNS-1] = 'red';
    board[ROWS-2][COLUMNS-1] = 'red';
    board[ROWS-1][COLUMNS-2] = 'red';
    board[0][COLUMNS-1] = 'green';
    board[1][COLUMNS-1] = 'green';
    board[0][COLUMNS-2] = 'green';
    board[ROWS-1][0] = 'brown';
    board[ROWS-2][0] = 'brown';
    board[ROWS-1][1] = 'brown';
    return board;
}

export function buildCircleBoard() {
    const board = buildBoard();
    for (let i = (COLUMNS / 2) - 1; i >= 0 ;i--) {
        for (let c = 0; c < i; c++) {
            board[(ROWS / 2) - 1 - i][i - c - 1] = 'blocked';
            board[(ROWS / 2) - 1 - i][COLUMNS - c - 1] = 'blocked';
            board[(ROWS / 2) + i][i - c -1] = 'blocked';
            board[(ROWS / 2) + i][COLUMNS - c - 1] = 'blocked';
        }
    }
    board[0][COLUMNS / 2] = 'blue';
    board[0][(COLUMNS / 2) -1] = 'blue';
    board[ROWS / 2][0] = 'brown';
    board[(ROWS / 2) - 1][0] = 'brown';
    board[ROWS / 2][COLUMNS -1] = 'green';
    board[(ROWS / 2) - 1][COLUMNS -1] = 'green';
    board[ROWS -1][COLUMNS / 2] = 'red';
    board[ROWS -1][(COLUMNS / 2) - 1] = 'red';
    return board;
}

export function buildEmptyCenterBoard() {
    const board = buildBoard();
    for (let i = 2; i >= 0; i--) {
        board[(ROWS / 2) - i][(COLUMNS / 2) - i] = 'blocked';
        board[(ROWS / 2) + i][(COLUMNS / 2) + i] = 'blocked';
        board[(ROWS / 2)][(COLUMNS / 2) + i] = 'blocked';
        board[(ROWS / 2) + i][(COLUMNS / 2)] = 'blocked';
        board[(ROWS / 2)][(COLUMNS / 2) - i] = 'blocked';
        board[(ROWS / 2) - i][(COLUMNS / 2)] = 'blocked';
        board[(ROWS / 2) + i][(COLUMNS / 2) - i] = 'blocked';
        board[(ROWS / 2) - i][(COLUMNS / 2) + i] = 'blocked';
    }
    return board;
}

const isSlotPossible = (y, x) => y >= 0 && x >= 0 && x < COLUMNS && y < ROWS

const isSlotOccupiedByEnemyOrFree = (y, x, board, color) => {
    const slot = board[y][x]
    return slot != 'selectable' && slot != color && slot != 'blocked' && slot != 'none';
}

const isSlotFree = (y, x, board) => board[y][x] === 'none';

function getMovableSlots(row, column, board) {
    const slotsToMove = [];
    const possibleRowModifiers = [-2, -1, 0, 1, 2];
    const possibleColumnModifiers = [-2, -1, 0, 1, 2];
    possibleRowModifiers.forEach(yModifier => {
        possibleColumnModifiers.forEach(xModifier => {
            const modifiedY = row + yModifier;
            const modifiedX = column + xModifier;
            if (isSlotPossible(modifiedY, modifiedX) && isSlotFree(modifiedY, modifiedX, board)) {
                slotsToMove.push({y: row + yModifier, x: column + xModifier});
            }
        })
    });
    return slotsToMove;
}

function getDifferentColorNeighbors(row, column, board, color) {
    const slotsToTake = []
    const possibleRowModifiers = [-1, 0, 1];
    const possibleColumnModifiers = [-1, 0, 1];
    possibleRowModifiers.forEach(yModifier => {
        possibleColumnModifiers.forEach(xModifier => {
            const modifiedY = row + yModifier;
            const modifiedX = column + xModifier;
            if (isSlotPossible(modifiedY, modifiedX) && isSlotOccupiedByEnemyOrFree(modifiedY, modifiedX, board, color)) {
                slotsToTake.push({y: row + yModifier, x: column + xModifier});
            }
        })
    });
    return slotsToTake;
}

export function getSlotsByType(board, slotType) {
    const slotsByType = [];
    board.forEach((row, rowIndex) => row.forEach((column, columnIndex) => {
        if (column === slotType) {
            slotsByType.push({y: rowIndex, x: columnIndex});
        }
    }))
    return slotsByType;
}

export function selectSlot(row, column, board) {
    const newBoard = [...board].map(row => row.map(column => column === 'selectable' ? 'none' : column));
    if (board[row][column] == 'blue') {
        const slotsToMove = getMovableSlots(row, column, newBoard);
        slotsToMove.forEach(slot => {
            newBoard[slot.y][slot.x] = 'selectable'
        })
        return newBoard;
    }
    if (board[row][column] == 'selectable') {
        newBoard[row][column] = 'blue';
        getDifferentColorNeighbors(row, column, newBoard, 'blue').forEach(slot => {
            newBoard[slot.y][slot.x] = 'blue';
        });
        return newBoard;
    }
    return undefined;
}

export function canPlayerMove(board) {
    return getSlotsByType(board, 'blue').map(slot => getMovableSlots(slot.y, slot.x, board)).flat().length > 0;
}

export function makeAIMove(board, color) {
    const newBoard = [...board];
    const aiSlots = getSlotsByType(board, color);
    const moves = aiSlots.map(slot => getMovableSlots(slot.y, slot.x, board)).flat();
    if (moves.length < 1) {
        return newBoard;
    }
    const moveToMake = moves[Math.floor(Math.random() * moves.length)];
    newBoard[moveToMake.y][moveToMake.x] = color;
    getDifferentColorNeighbors(moveToMake.y, moveToMake.x, newBoard, color).forEach(slot => {
        newBoard[slot.y][slot.x] = color;
    });
    return newBoard;
}

export function isGameOver(board) {
    return getSlotsByType(board, 'none').length < 1 && getSlotsByType(board, 'selectable').length < 1;
}

