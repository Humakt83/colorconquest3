import 'react-native';
import React from 'react';
import Board from '../../../src/components/game/Board';

import {render} from '@testing-library/react-native';
import {buildCircleBoard} from '../../../src/logic/board';
import {ROWS, COLUMNS, PLAYER_COLORS} from '../../../src/constants';
const colors = PLAYER_COLORS.slice(0, 4);
const boardColors = colors.map((c) => c.name);

it('renders correctly', () => {
  render(
    <Board route={{params: {board: buildCircleBoard(boardColors), colors}}} />,
  );
});

it('renders a board of ROWS * COLUMNS circles', () => {
  const {getAllByTestId} = render(
    <Board route={{params: {board: buildCircleBoard(boardColors), colors}}} />,
  );
  expect(getAllByTestId('square').length).toEqual(ROWS * COLUMNS);
});
