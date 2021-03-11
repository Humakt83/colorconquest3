import 'react-native';
import React from 'react';
import Square from '../../../src/components/game/Square';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Square column={'blue'}/>);
});
