import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Button
} from 'react-native';

import {buildBoard, buildCircleBoard, buildEmptyCenterBoard} from '../conquest';
import {commonStyles} from './common';

const Menu = ({ navigation }) => {

  const startGame = (board) => {
    navigation.navigate('Board', {board});
  }

  return (
    <SafeAreaView style={commonStyles.body}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={commonStyles.scrollView}>
          <Button onPress={() => startGame(buildBoard())} title="New Square Game"/> 
          <Button onPress={() => startGame(buildCircleBoard())} title="New Circle Game"/>
          <Button onPress={() => startGame(buildEmptyCenterBoard())} title="New Empty Center Game"/>  
          <Button onPress={() => navigation.navigate('Help')} title="Help"/>  
        </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
