import React from 'react';

import Menu from './src/components/Menu';
import Board from './src/components/game/Board';
import Help from './src/components/Help';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Title from './src/components/Title';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const options = {headerTitle: () => <Title />};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Menu} options={options} />
        <Stack.Screen name="Board" component={Board} options={options} />
        <Stack.Screen name="Help" component={Help} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
