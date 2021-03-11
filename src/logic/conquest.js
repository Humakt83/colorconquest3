import {ROWS, COLUMNS} from '../constants';

const isSlotPossible = (y, x) => y >= 0 && x >= 0 && x < COLUMNS && y < ROWS;

const isSlotOccupiedByEnemyOrFree = (y, x, board, color) => {
  const slot = board[y][x];
  return (
    slot !== 'selectable' &&
    slot !== color &&
    slot !== 'blocked' &&
    slot !== 'none'
  );
};

const isSlotFree = (y, x, board) => board[y][x] === 'none';

function getMovableSlots(row, column, board) {
  const slotsToMove = [];
  const possibleRowModifiers = [-2, -1, 0, 1, 2];
  const possibleColumnModifiers = [-2, -1, 0, 1, 2];
  possibleRowModifiers.forEach((yModifier) => {
    possibleColumnModifiers.forEach((xModifier) => {
      const modifiedY = row + yModifier;
      const modifiedX = column + xModifier;
      if (
        isSlotPossible(modifiedY, modifiedX) &&
        isSlotFree(modifiedY, modifiedX, board)
      ) {
        slotsToMove.push({y: row + yModifier, x: column + xModifier});
      }
    });
  });
  return slotsToMove;
}

function getDifferentColorNeighbors(row, column, board, color) {
  const slotsToTake = [];
  const possibleRowModifiers = [-1, 0, 1];
  const possibleColumnModifiers = [-1, 0, 1];
  possibleRowModifiers.forEach((yModifier) => {
    possibleColumnModifiers.forEach((xModifier) => {
      const modifiedY = row + yModifier;
      const modifiedX = column + xModifier;
      if (
        isSlotPossible(modifiedY, modifiedX) &&
        isSlotOccupiedByEnemyOrFree(modifiedY, modifiedX, board, color)
      ) {
        slotsToTake.push({y: row + yModifier, x: column + xModifier});
      }
    });
  });
  return slotsToTake;
}

export function getSlotsByType(board, slotType) {
  const slotsByType = [];
  board.forEach((row, rowIndex) =>
    row.forEach((column, columnIndex) => {
      if (column === slotType) {
        slotsByType.push({y: rowIndex, x: columnIndex});
      }
    }),
  );
  return slotsByType;
}

export function selectSlot(row, column, board) {
  const newBoard = [...board].map((r) =>
    r.map((c) => (c === 'selectable' ? 'none' : c)),
  );
  if (board[row][column] === 'blue') {
    const slotsToMove = getMovableSlots(row, column, newBoard);
    slotsToMove.forEach((slot) => {
      newBoard[slot.y][slot.x] = 'selectable';
    });
    return newBoard;
  }
  if (board[row][column] === 'selectable') {
    newBoard[row][column] = 'blue';
    getDifferentColorNeighbors(row, column, newBoard, 'blue').forEach(
      (slot) => {
        newBoard[slot.y][slot.x] = 'blue';
      },
    );
    return newBoard;
  }
  return undefined;
}

export function canPlayerMove(board) {
  return (
    getSlotsByType(board, 'blue')
      .map((slot) => getMovableSlots(slot.y, slot.x, board))
      .flat().length > 0
  );
}

export function makeAIMove(board, color) {
  const newBoard = [...board];
  const aiSlots = getSlotsByType(board, color);
  const moves = aiSlots
    .map((slot) => getMovableSlots(slot.y, slot.x, board))
    .flat();
  if (moves.length < 1) {
    return newBoard;
  }
  const moveToMake = moves[Math.floor(Math.random() * moves.length)];
  newBoard[moveToMake.y][moveToMake.x] = color;
  getDifferentColorNeighbors(
    moveToMake.y,
    moveToMake.x,
    newBoard,
    color,
  ).forEach((slot) => {
    newBoard[slot.y][slot.x] = color;
  });
  return newBoard;
}

export function isGameOver(board) {
  return (
    getSlotsByType(board, 'none').length < 1 &&
    getSlotsByType(board, 'selectable').length < 1
  );
}
