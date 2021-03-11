import 'react-native';
import React from 'react';
import Square from '../../../src/components/game/Square';
import { COLORS } from '../../../src/constants';
import {render} from '@testing-library/react-native';

it('renders blue square', () => {
  const {queryByTestId} = render(<Square column={'blue'}/>);
  expect(queryByTestId('square')).toHaveStyle({backgroundColor: COLORS.blue});
});

it('renders brown square', () => {
  const {queryByTestId} = render(<Square column={'selectable'}/>);
  expect(queryByTestId('square')).toHaveStyle({backgroundColor: COLORS.lightblue});
});

it('renders brown square', () => {
  const {queryByTestId} = render(<Square column={'brown'}/>);
  expect(queryByTestId('square')).toHaveStyle({backgroundColor: COLORS.brown});
});

it('renders red square', () => {
  const {queryByTestId} = render(<Square column={'red'}/>);
  expect(queryByTestId('square')).toHaveStyle({backgroundColor: COLORS.red});
});

it('renders green square', () => {
  const {queryByTestId} = render(<Square column={'green'}/>);
  expect(queryByTestId('square')).toHaveStyle({backgroundColor: COLORS.green});
});

it('renders empty square', () => {
  const {queryByTestId} = render(<Square column={'none'}/>);
  expect(queryByTestId('square')).toHaveStyle({backgroundColor: COLORS.white});
});

it('renders blocked square', () => {
  const {queryByTestId} = render(<Square column={'blocked'}/>);
  expect(queryByTestId('square')).toHaveStyle({backgroundColor: COLORS.lightgrey, borderColor: COLORS.lightgrey});
});
