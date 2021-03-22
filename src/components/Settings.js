import React, {useState, useEffect} from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {commonStyles} from './common';
import {COLORS} from '../constants';
import {
  SettingsBus,
  EVENT_MUSIC,
  readSettings,
  SETTINGS_MUSIC_KEY,
  SPEED,
  SETTINGS_SPEED_KEY,
  EVENT_SPEED,
  storeSettings,
} from '../settings-util';

const Settings = () => {
  const [playing, togglePlay] = useState(false);
  const [speed, setSpeed] = useState(SPEED.medium);

  useEffect(() => {
    readSettings(SETTINGS_MUSIC_KEY, togglePlay);
    readSettings(SETTINGS_SPEED_KEY, setSpeed);
  }, []);

  const musicOnOff = async () => {
    const musicOn = !playing;
    togglePlay(musicOn);
    storeSettings(SETTINGS_MUSIC_KEY, musicOn);
    SettingsBus.dispatch(EVENT_MUSIC, musicOn);
  };

  const changeSpeed = async (val) => {
    setSpeed(val);
    storeSettings(SETTINGS_SPEED_KEY, val);
    SettingsBus.dispatch(EVENT_SPEED, val);
  };

  return (
    <SafeAreaView style={commonStyles.body}>
      <Text style={styles.header}>SETTINGS</Text>
      <Button title={playing ? 'Music Off' : 'Music On'} onPress={musicOnOff} />
      <Text style={styles.speedSetting}>SPEED</Text>
      <View style={styles.speedContainer}>
        <Button
          title="SLOW"
          disabled={speed === SPEED.slow}
          onPress={() => changeSpeed(SPEED.slow)}
        />
        <Button
          title="MEDIUM"
          disabled={speed === SPEED.medium}
          onPress={() => changeSpeed(SPEED.medium)}
        />
        <Button
          title="FAST"
          disabled={speed === SPEED.fast}
          onPress={() => changeSpeed(SPEED.fast)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  speedContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 28,
  },
  speedSetting: {
    borderTopWidth: 2,
    borderTopColor: COLORS.white,
    marginTop: 5,
  },
});

export default Settings;
