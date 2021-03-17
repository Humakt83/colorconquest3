import {ROWS, COLUMNS} from '../constants';

export function buildBoard(colors) {
  const board = [];
  for (let y = 0; y < ROWS; y++) {
    const row = [];
    for (let x = 0; x < COLUMNS; x++) {
      row.push('none');
    }
    board.push(row);
  }
  board[0][0] = colors[0];
  board[1][0] = colors[0];
  board[0][1] = colors[0];
  board[ROWS - 1][COLUMNS - 1] = colors[1];
  board[ROWS - 2][COLUMNS - 1] = colors[1];
  board[ROWS - 1][COLUMNS - 2] = colors[1];
  board[0][COLUMNS - 1] = colors[2];
  board[1][COLUMNS - 1] = colors[2];
  board[0][COLUMNS - 2] = colors[2];
  board[ROWS - 1][0] = colors[3];
  board[ROWS - 2][0] = colors[3];
  board[ROWS - 1][1] = colors[3];
  return board;
}

export function buildCircleBoard(colors) {
  const board = buildBoard(colors);
  for (let i = COLUMNS / 2 - 1; i >= 0; i--) {
    for (let c = 0; c < i; c++) {
      board[ROWS / 2 - 1 - i][i - c - 1] = 'blocked';
      board[ROWS / 2 - 1 - i][COLUMNS - c - 1] = 'blocked';
      board[ROWS / 2 + i][i - c - 1] = 'blocked';
      board[ROWS / 2 + i][COLUMNS - c - 1] = 'blocked';
    }
  }
  board[0][COLUMNS / 2] = colors[0];
  board[0][COLUMNS / 2 - 1] = colors[0];
  board[ROWS / 2][0] = colors[1];
  board[ROWS / 2 - 1][0] = colors[1];
  board[ROWS / 2][COLUMNS - 1] = colors[2];
  board[ROWS / 2 - 1][COLUMNS - 1] = colors[2];
  board[ROWS - 1][COLUMNS / 2] = colors[3];
  board[ROWS - 1][COLUMNS / 2 - 1] = colors[3];
  return board;
}

export function buildEmptyCenterBoard(colors) {
  const board = buildBoard(colors);
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

export function buildTriangleBoard(colors) {
  const board = buildBoard(colors);
  for (let i = ROWS; i > 1; i--) {
    for (let c = Math.floor(i / 2 - 1); c >= 0; c--) {
      board[ROWS - i][c] = 'blocked';
      board[ROWS - i][COLUMNS - c - 1] = 'blocked';
    }
  }
  board[0][COLUMNS / 2] = colors[0];
  board[0][COLUMNS / 2 - 1] = colors[0];
  board[ROWS / 2][COLUMNS / 2] = colors[2];
  board[ROWS / 2][COLUMNS / 2 - 1] = colors[2];
  return board;
}
