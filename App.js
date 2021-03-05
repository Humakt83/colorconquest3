import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button
} from 'react-native';

import {buildBoard, buildCircleBoard, buildEmptyCenterBoard} from './src/conquest';
import {COLORS} from './src/constants';

import Board from './src/components/Board';
import Title from './src/components/Title';

const App: () => React$Node = () => {

  const [game, setGame] = useState({board: buildBoard()});

  return (
    <>
      <StatusBar barStyle="dark-content" />      
      <SafeAreaView style={styles.body}>
        <Title />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>          
          <Board game={game}/>
          <Button onPress={() => setGame({board: buildBoard()})} title="New Square Game"/> 
          <Button onPress={() => setGame({board: buildCircleBoard()})} title="New Circle Game"/>
          <Button onPress={() => setGame({board: buildEmptyCenterBoard()})} title="New Empty Center Game"/>  
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
