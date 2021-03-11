import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {commonStyles} from './common';

const Help = () => {
  return (
    <SafeAreaView style={commonStyles.body}>
      <Text style={styles.helpHeader}>HELP</Text>
      <Text style={styles.helpBody}>
        Conquer the board with your blue color.{'\n'}
        Select a square with a blue color on it and then select a highlighted
        empty square where to move. Highlighted square will change to your blue
        color as well as all non-empty squares around it.
        {'\n'}
        {'\n'}
        Game is turn-based and computer players then make a move. Game ends when
        there are no empty squares left.{'\n'}
        Winner is the player with most squares.{'\n'}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  helpHeader: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 28,
  },
  helpBody: {
    margin: 5,
    textAlign: 'center',
  },
});

export default Help;
