import 'react-native';
import React from 'react';
import Status from '../../../src/components/game/Status';
import {buildBoard} from '../../../src/logic/board';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.create(<Status board={buildBoard()} gameOver={false} />);
});

it('shows number of squares for each color', () => {
  const {getByText} = render(<Status board={buildBoard()} gameOver={false} />);
  expect(getByText('GREEN: 3')).toBeTruthy();
  expect(getByText('BLUE: 3')).toBeTruthy();
  expect(getByText('RED: 3')).toBeTruthy();
  expect(getByText('BROWN: 3')).toBeTruthy();
});

it('shows game is draw', () => {
  const {getByText} = render(<Status board={buildBoard()} gameOver={true} />);
  expect(getByText('Game Over! DRAW!')).toBeTruthy();
})

it('shows game is won by Blue', () => {
  const board = buildBoard();
  board[5][5] = 'blue';
  const {getByText} = render(<Status board={board} gameOver={true} />);
  expect(getByText('BLUE: 4')).toBeTruthy();
  expect(getByText('Game Over! Blue is WINNER!')).toBeTruthy();
})
