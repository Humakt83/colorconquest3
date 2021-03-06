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

export function getMovableSlots(row, column, board) {
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

export function getDifferentColorNeighbors(row, column, board, color) {
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
        slotsToTake.push({
          y: row + yModifier,
          x: column + xModifier,
          slot: board[modifiedY][modifiedX],
        });
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

export function selectSlot(row, column, board, playerColor) {
  const newBoard = [...board].map((r) =>
    r.map((c) => (c === 'selectable' ? 'none' : c)),
  );
  if (board[row][column] === playerColor) {
    const slotsToMove = getMovableSlots(row, column, newBoard);
    slotsToMove.forEach((slot) => {
      newBoard[slot.y][slot.x] = 'selectable';
    });
    return newBoard;
  }
  if (board[row][column] === 'selectable') {
    newBoard[row][column] = playerColor;
    getDifferentColorNeighbors(row, column, newBoard, playerColor).forEach(
      (slot) => {
        newBoard[slot.y][slot.x] = playerColor;
      },
    );
    return newBoard;
  }
  return undefined;
}

export function canPlayerMove(board, playerColor) {
  return (
    getSlotsByType(board, playerColor)
      .map((slot) => getMovableSlots(slot.y, slot.x, board))
      .flat().length > 0
  );
}

export function isGameOver(board) {
  return (
    getSlotsByType(board, 'none').length < 1 &&
    getSlotsByType(board, 'selectable').length < 1
  );
}
