import React, {useEffect, useRef} from 'react';

import Menu from './src/components/Menu';
import Board from './src/components/game/Board';
import Help from './src/components/Help';
import Settings from './src/components/Settings';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppState} from 'react-native';

import SoundPlayer from 'react-native-sound-player';
import {SettingsBus, EVENT_MUSIC, readSettings, SETTINGS_MUSIC_KEY} from './src/settings-util'

import Title from './src/components/Title';

const Stack = createStackNavigator();

const App: () => React$Node = () => {

  const appState = useRef(AppState.currentState);

  let subscribedToMusic = null;

  const playMusic = (play) => {
    if (play) {      
      const musicOn = () => SoundPlayer.playSoundFile('colors', 'wav');
      subscribedToMusic = SoundPlayer.addEventListener('FinishedPlaying', musicOn)
      musicOn();
    } else {
      if (subscribedToMusic) {
        subscribedToMusic.remove();
      }
      SoundPlayer.stop();
    }    
  }

  SettingsBus.listen('Music', (event, value) => {
    if (event === EVENT_MUSIC) {
      playMusic(value);
    }
  })

  readSettings(SETTINGS_MUSIC_KEY, playMusic);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    }
  });

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      readSettings(SETTINGS_MUSIC_KEY, playMusic);
    } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
      playMusic(false);
    }
    appState.current = nextAppState;
  }

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
