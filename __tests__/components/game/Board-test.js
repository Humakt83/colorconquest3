import 'react-native';
import React from 'react';
import Board from '../../../src/components/game/Board';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Board />);
});
