import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

import {COLORS} from './src/constants';

import Board from './src/components/Board';
import Title from './src/components/Title';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />      
      <SafeAreaView style={styles.body}>
        <Title />
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
    backgroundColor: COLORS.lightgrey,
  },
  body: {
    backgroundColor: COLORS.lightgrey,
    minHeight: '100%'
  },
});

export default App;
