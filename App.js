import React, {useEffect} from 'react';

import Menu from './src/components/Menu';
import Board from './src/components/game/Board';
import Help from './src/components/Help';
import Settings from './src/components/Settings';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SoundPlayer from 'react-native-sound-player';
import {SettingsBus, EVENT_MUSIC, readSettings, SETTINGS_MUSIC_KEY} from './src/settings-util'

import Title from './src/components/Title';

const Stack = createStackNavigator();

const App: () => React$Node = () => {

  const playMusic = (play) => {
    if (play) {
      SoundPlayer.playSoundFile('colors', 'wav');
    } else {
      SoundPlayer.stop();
    }    
  }

  SettingsBus.listen('Music', (event, value) => {
    if (event === EVENT_MUSIC) {
      playMusic(value);
    }
  })

  useEffect(() => {
    readSettings(SETTINGS_MUSIC_KEY, playMusic);
  }, []);

  const options = {headerTitle: () => <Title />};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Menu} options={options} />
        <Stack.Screen name="Board" component={Board} options={options} />
        <Stack.Screen name="Settings" component={Settings} options={options} />
        <Stack.Screen name="Help" component={Help} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
