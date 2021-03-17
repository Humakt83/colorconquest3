import 'react-native';
import React from 'react';
import Status from '../../../src/components/game/Status';
import {buildBoard} from '../../../src/logic/board';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import {PLAYER_COLORS} from '../../../src/constants';

const colors = PLAYER_COLORS.slice(0, 4);
const boardColors = colors.map((c) => c.name);

it('renders correctly', () => {
  renderer.create(
    <Status board={buildBoard(boardColors)} gameOver={false} colors={colors} />,
  );
});

it('shows number of squares for each color', () => {
  const {getByText} = render(
    <Status board={buildBoard(boardColors)} gameOver={false} colors={colors} />,
  );
  expect(getByText('GREEN: 3')).toBeTruthy();
  expect(getByText('BLUE: 3')).toBeTruthy();
  expect(getByText('RED: 3')).toBeTruthy();
  expect(getByText('BROWN: 3')).toBeTruthy();
});

it('shows game is draw', () => {
  const {getByText} = render(
    <Status board={buildBoard(boardColors)} gameOver={true} colors={colors} />,
  );
  expect(getByText('Game Over! DRAW!')).toBeTruthy();
});

it('shows game is won by Blue', () => {
  const board = buildBoard(boardColors);
  board[5][5] = 'blue';
  const {getByText} = render(
    <Status board={board} gameOver={true} colors={colors} />,
  );
  expect(getByText('BLUE: 4')).toBeTruthy();
  expect(getByText('Game Over! BLUE is WINNER!')).toBeTruthy();
});
