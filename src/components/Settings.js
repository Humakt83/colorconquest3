import React, {useState, useEffect} from 'react';
import {SafeAreaView, Button, StyleSheet, Text} from 'react-native';
import {commonStyles} from './common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SettingsBus, EVENT_MUSIC, readSettings, SETTINGS_MUSIC_KEY} from '../settings-util'

const Settings = () => {

  [playing, togglePlay] = useState(true);
  
  useEffect(() => {
    readSettings(SETTINGS_MUSIC_KEY, togglePlay);
  }, [])  

  const musicOnOff = async () => {
    const musicOn = !playing;
    togglePlay(musicOn);
    try {
      console.log(JSON.stringify(musicOn));
      await AsyncStorage.setItem(SETTINGS_MUSIC_KEY, JSON.stringify(musicOn));
    } catch (e) {
      console.log('Unable to store settings data');
      console.log(e);
    }
    SettingsBus.dispatch(EVENT_MUSIC, musicOn);
  }

  return (
    <SafeAreaView style={commonStyles.body}>
      <Text style={styles.header}>SETTINGS</Text>
      <Button title={playing ? 'Music Off' : 'Music On'} onPress={musicOnOff}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 28,
  },
});

export default Settings;
