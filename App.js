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

  const [game, setGame] = useState(null);
  const [isStarted, setStarted] = useState(false);

  const startGame = (board) => {
    setStarted(true);
    setGame({board});
  }

  const board = isStarted ? <Board game={game} /> : null

  return (
    <>
      <StatusBar barStyle="dark-content" />      
      <SafeAreaView style={styles.body}>
        <Title />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {board}
          <Button onPress={() => startGame(buildBoard())} title="New Square Game"/> 
          <Button onPress={() => startGame(buildCircleBoard())} title="New Circle Game"/>
          <Button onPress={() => startGame(buildEmptyCenterBoard())} title="New Empty Center Game"/>  
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
