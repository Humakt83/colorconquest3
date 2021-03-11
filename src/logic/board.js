import {ROWS, COLUMNS} from '../constants';

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
  board[ROWS - 1][COLUMNS - 1] = 'red';
  board[ROWS - 2][COLUMNS - 1] = 'red';
  board[ROWS - 1][COLUMNS - 2] = 'red';
  board[0][COLUMNS - 1] = 'green';
  board[1][COLUMNS - 1] = 'green';
  board[0][COLUMNS - 2] = 'green';
  board[ROWS - 1][0] = 'brown';
  board[ROWS - 2][0] = 'brown';
  board[ROWS - 1][1] = 'brown';
  return board;
}

export function buildCircleBoard() {
  const board = buildBoard();
  for (let i = COLUMNS / 2 - 1; i >= 0; i--) {
    for (let c = 0; c < i; c++) {
      board[ROWS / 2 - 1 - i][i - c - 1] = 'blocked';
      board[ROWS / 2 - 1 - i][COLUMNS - c - 1] = 'blocked';
      board[ROWS / 2 + i][i - c - 1] = 'blocked';
      board[ROWS / 2 + i][COLUMNS - c - 1] = 'blocked';
    }
  }
  board[0][COLUMNS / 2] = 'blue';
  board[0][COLUMNS / 2 - 1] = 'blue';
  board[ROWS / 2][0] = 'brown';
  board[ROWS / 2 - 1][0] = 'brown';
  board[ROWS / 2][COLUMNS - 1] = 'green';
  board[ROWS / 2 - 1][COLUMNS - 1] = 'green';
  board[ROWS - 1][COLUMNS / 2] = 'red';
  board[ROWS - 1][COLUMNS / 2 - 1] = 'red';
  return board;
}

export function buildEmptyCenterBoard() {
  const board = buildBoard();
  for (let i = 2; i >= 0; i--) {
    board[ROWS / 2 - i][COLUMNS / 2 - i] = 'blocked';
    board[ROWS / 2 + i][COLUMNS / 2 + i] = 'blocked';
    board[ROWS / 2][COLUMNS / 2 + i] = 'blocked';
    board[ROWS / 2 + i][COLUMNS / 2] = 'blocked';
    board[ROWS / 2][COLUMNS / 2 - i] = 'blocked';
    board[ROWS / 2 - i][COLUMNS / 2] = 'blocked';
    board[ROWS / 2 + i][COLUMNS / 2 - i] = 'blocked';
    board[ROWS / 2 - i][COLUMNS / 2 + i] = 'blocked';
  }
  return board;
}
