import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants';

const Title = () => {

  return (
    <Text style={styles.title}>
      COLOR CONQUEST
      <Text style={styles.titleNumber}> 3</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.blue,
    textAlign: 'center',
  },
  titleNumber: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.red,
  },
});

export default Title;
