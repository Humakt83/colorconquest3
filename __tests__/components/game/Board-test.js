import 'react-native';
import React from 'react';
import Board from '../../../src/components/game/Board';

import {render} from '@testing-library/react-native';
import {buildCircleBoard} from '../../../src/logic/board'
import {ROWS, COLUMNS } from '../../../src/constants';

it('renders correctly', () => {
  render(<Board route={{params: {board: buildCircleBoard()}}}/>);
});

it('renders a board of ROWS * COLUMNS circles', () => {
  const {getAllByTestId}= render(<Board route={{params: {board: buildCircleBoard()}}}/>);
  expect(getAllByTestId('square').length).toEqual(ROWS * COLUMNS);
});
