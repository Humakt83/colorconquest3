import React, {useState} from 'react';
import {
  SafeAreaView, 
  View, 
  ScrollView, 
  Button, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Text } from 'react-native';
import { COLORS } from '../constants';

import {
  buildBoard,
  buildCircleBoard,
  buildEmptyCenterBoard,
} from '../logic/board';
import {commonStyles} from './common';

const BOARD_TYPES = [
  {name: 'SQUARE', createFn: buildBoard, image: require('../res/square.png')},
  {name: 'CIRCLE', createFn: buildCircleBoard, image: require('../res/circle.png')},
  {name: 'EMPTYCENTER', createFn: buildEmptyCenterBoard, image: require('../res/emptycenter.png')}
];

const styles = StyleSheet.create({
  boardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 5,
    marginBottom: 5
  },
  imageButton: {
    backgroundColor: COLORS.brown,
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
    marginRight: 5
  },
  selectedBoard: {
    backgroundColor: COLORS.green,
  },
  image: {
    width: 25,
    height: 25
  }
});

const Menu = ({navigation}) => {
  const [boardType, setBoardType] = useState(BOARD_TYPES[0]);

  const startGame = () => {
    const board = boardType.createFn();
    navigation.navigate('Board', {board});
  };

  return (
    <SafeAreaView style={commonStyles.body}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={commonStyles.scrollView}>
          <View style={styles.boardContainer}>
            <Text>SELECT BOARD </Text>
            {BOARD_TYPES.map((board) => {
              const style = board === boardType ? [styles.imageButton, styles.selectedBoard] : styles.imageButton;
              return (<TouchableOpacity style={style} onPress={() => setBoardType(board)} key={board.name}>
                <Image style={styles.image} source={board.image} />
              </TouchableOpacity>)
            })}
          </View>     
        <Button onPress={() => startGame()} title="Start Game"></Button>
        <Button onPress={() => navigation.navigate('Help')} title="Help" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
