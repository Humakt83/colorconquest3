import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import GradientButton from './common/GradientButton'
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
    <SafeAreaView style={[commonStyles.body, styles.center]}>
      <Text style={styles.header}>SETTINGS</Text>
      <GradientButton title={playing ? 'Music Off' : 'Music On'} onPress={musicOnOff} />
      <Text style={styles.speedSetting}>SPEED</Text>
      <View style={styles.speedContainer}>
        <GradientButton
          title="SLOW"
          disabled={speed === SPEED.slow}
          onPress={() => changeSpeed(SPEED.slow)}
        />
        <GradientButton
          title="MEDIUM"
          disabled={speed === SPEED.medium}
          onPress={() => changeSpeed(SPEED.medium)}
        />
        <GradientButton
          title="FAST"
          disabled={speed === SPEED.fast}
          onPress={() => changeSpeed(SPEED.fast)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center'
  },
  speedContainer: {
    width: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  header: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 15
  },
  speedSetting: {
    width: 300,
    borderTopWidth: 4,
    borderTopColor: COLORS.white,
    marginTop: 15,
    textAlign: 'center',
    paddingTop: 15,
    marginBottom: 8,
    fontWeight: '700'
  },
});

export default Settings;
