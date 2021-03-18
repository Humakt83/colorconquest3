import {getSlotsByType, getMovableSlots, getDifferentColorNeighbors} from './conquest';

const RANDOM_AI = 'RANDOM';
const SOPHISTICATED_AI = 'SOPHISTICATED';
const EVIL_AI = 'EVIL';

const getPossibleMoves = (board, color) => {
  const aiSlots = getSlotsByType(board, color);
  return aiSlots
    .map((slot) => getMovableSlots(slot.y, slot.x, board))
    .flat();
}

const makeRandomMove = (board, color, moves) => {
  const moveToMake = moves[Math.floor(Math.random() * moves.length)];
  board[moveToMake.y][moveToMake.x] = color;
  getDifferentColorNeighbors(
    moveToMake.y,
    moveToMake.x,
    board,
    color,
  ).forEach((slot) => {
    board[slot.y][slot.x] = color;
  });
  return board;
}

const movesWithMostImpact = (moves) => {
  return moves.reduce((a, b) => {
    if (a.length < 1 || a.some((move) => move.amount < b.amount)) {
      return [b];
    }
    if (a.find((move) => move.amount === b.amount)) {
      return a.concat(b);
    }
    return a;
  }, []);
}

function makeRandomAIMove(board, color) {
  const newBoard = [...board];
  const moves = getPossibleMoves(board, color);
  if (moves.length < 1) {
    return newBoard;
  }
  return makeRandomMove(newBoard, color, moves);
}

function makeSmartAIMove(board, color) {
  const newBoard = [...board];
  const moves = getPossibleMoves(board, color);
  if (moves.length < 1) {
    return newBoard;
  }
  const movesWithAmountsChanged = moves.map((move) => {
    const amountOfNeighbors = getDifferentColorNeighbors(
      move.y,
      move.x,
      board,
      color,
    );
    return Object.assign({}, move, {amount: amountOfNeighbors.length});
  });
  return makeRandomMove(newBoard, color, movesWithMostImpact(movesWithAmountsChanged));
}

function makeEvilAIMove(board, color, playerColor) {
  const newBoard = [...board];
  const moves = getPossibleMoves(board, color);
  if (moves.length < 1) {
    return newBoard;
  }
  const movesWithAmountsChanged = moves.map((move) => {
    const amountOfNeighbors = getDifferentColorNeighbors(
      move.y,
      move.x,
      board,
      color,
    );
    const playerAmount = amountOfNeighbors.filter((neighbor) => neighbor.slot === playerColor).length
    return Object.assign({}, move, {amount: playerAmount});
  });
  return makeRandomMove(newBoard, color, movesWithMostImpact(movesWithAmountsChanged));
}

export function makeAIMove(board, color, playerColor, aiType) {
  switch(aiType) {
    case EVIL_AI: {
      return makeEvilAIMove(board, color, playerColor);
    }
    case SOPHISTICATED_AI: {
      return makeSmartAIMove(board, color);
    }
    default:
      return makeRandomAIMove(board, color);
  }
}

export function makeAIPersonalities(playerColors) {
  let aiColors = playerColors.slice(1);
  aiColors.forEach((color) => color.aiType = RANDOM_AI);
  aiColors[Math.floor(Math.random() * aiColors.length)].aiType = EVIL_AI;
  while (!aiColors.find((color) => color.aiType === SOPHISTICATED_AI)) {
    const random = Math.floor(Math.random() * aiColors.length);
    if (aiColors[random].aiType !== EVIL_AI) {
      aiColors[random].aiType = SOPHISTICATED_AI;
    }
  }
  return aiColors;
}
