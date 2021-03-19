import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import {COLORS, PLAYER_COLORS} from '../constants';

import {
  buildBoard,
  buildCircleBoard,
  buildEmptyCenterBoard,
  buildTriangleBoard,
} from '../logic/board';
import {commonStyles} from './common';

const BOARD_TYPES = [
  {name: 'SQUARE', createFn: buildBoard, image: require('../res/square.png')},
  {
    name: 'CIRCLE',
    createFn: buildCircleBoard,
    image: require('../res/circle.png'),
  },
  {
    name: 'EMPTYCENTER',
    createFn: buildEmptyCenterBoard,
    image: require('../res/emptycenter.png'),
  },
  {
    name: 'TRIANGLE',
    createFn: buildTriangleBoard,
    image: require('../res/triangle.png'),
  },
];

const imageButton = {
  backgroundColor: COLORS.brown,
  borderRadius: 5,
  padding: 5,
  marginLeft: 5,
  marginRight: 5,
};

const COLOR_BUTTONS = PLAYER_COLORS.map((color) => {
  const style = Object.assign({}, imageButton, {
    backgroundColor: color.color,
    borderWidth: 2,
    borderColor: COLORS.lightgrey,
    padding: 10,
  });
  return Object.assign({}, color, {style: style});
});

const Menu = ({navigation}) => {
  const [boardType, setBoardType] = useState(BOARD_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(PLAYER_COLORS[0]);

  const startGame = () => {
    const colors = [selectedColor];
    while (colors.length < 4) {
      const randomColor =
        PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
      if (!colors.includes(randomColor)) {
        colors.push(randomColor);
      }
    }
    const board = boardType.createFn(colors.map((c) => c.name));
    navigation.navigate('Board', {board, colors});
  };

  return (
    <SafeAreaView style={commonStyles.body}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={commonStyles.scrollView}>
        <View style={styles.boardContainer}>
          <Text>SELECT COLOR</Text>
          {COLOR_BUTTONS.map((colorButton) => {
            const style =
              selectedColor.name === colorButton.name
                ? [colorButton.style, styles.selectedColor]
                : colorButton.style;
            return (
              <TouchableOpacity
                style={style}
                onPress={() =>
                  setSelectedColor(
                    PLAYER_COLORS.find((c) => c.name === colorButton.name),
                  )
                }
                key={colorButton.name}
              />
            );
          })}
        </View>
        <View style={styles.boardContainer}>
          <Text>SELECT BOARD </Text>
          {BOARD_TYPES.map((board) => {
            const style =
              board === boardType
                ? [styles.imageButton, styles.selectedBoard]
                : styles.imageButton;
            return (
              <TouchableOpacity
                style={style}
                onPress={() => setBoardType(board)}
                key={board.name}>
                <Image style={styles.image} source={board.image} />
              </TouchableOpacity>
            );
          })}
        </View>
        <Button onPress={() => startGame()} title="Start Game" />
        <Button onPress={() => navigation.navigate('Settings')} title="Settings" />
        <Button onPress={() => navigation.navigate('Help')} title="Help" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  imageButton,
  selectedColor: {
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  selectedBoard: {
    backgroundColor: COLORS.green,
  },
  image: {
    width: 25,
    height: 25,
  },
});

export default Menu;
