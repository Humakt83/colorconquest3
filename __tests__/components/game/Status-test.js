import 'react-native';
import React from 'react';
import Status from '../../../src/components/game/Status';
import {buildBoard} from '../../../src/logic/board';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.create(<Status board={buildBoard()} gameOver="false" />);
});

it('shows number of squares for each color', () => {
  const {getByText} = render.create(
    <Status board={buildBoard()} gameOver="false" />,
  );
  expect(getByText('Green: 3')).toExist();
});
