/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text
} from 'react-native';

import {COLORS} from './src/constants';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Board from './src/components/Board';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />      
      <SafeAreaView>
        <Text style={styles.title}>COLOR CONQUEST
          <Text style={styles.titleNumber}> 3</Text>
        </Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>          
          <Board />  
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.blue,
    textAlign: 'center'
  },
  titleNumber: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.red,
  }
});

export default App;
