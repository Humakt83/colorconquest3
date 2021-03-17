import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView, Button} from 'react-native';
import {
  selectSlot,
  makeAIMove,
  isGameOver,
  canPlayerMove,
} from '../../logic/conquest';
import Status from './Status';
import Square from './Square';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';
import {commonStyles} from '../common';

const AI_DELAY = 100;
let aiTimer;

const Board = ({navigation, route}) => {
  const [gameBoard, setGameBoard] = useState(route.params.board);
  const [colors, setColors] = useState(route.params.colors);
  const [isAITurn, setAITurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withSequence(
      withSpring(5),
      withSpring(-5),
      withSpring(0, {duration: 50}),
    );
    setGameBoard(route.params.board);
    setColors(route.params.colors);
    setAITurn(false);
    setGameOver(false);
    return () => clearTimeout(aiTimer);
  }, [route.params.board, route.params.colors]); // eslint-disable-line react-hooks/exhaustive-deps

  const initAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  const playAITurn = (activeAIPlayer, boardAfterAITurn) => {
    aiTimer = setTimeout(() => {
      boardAfterAITurn = makeAIMove(
        boardAfterAITurn,
        colors[activeAIPlayer].name,
      );
      setGameOver(isGameOver(boardAfterAITurn));
      setGameBoard(boardAfterAITurn);
      if (
        !isGameOver(boardAfterAITurn) &&
        !(
          activeAIPlayer === 3 &&
          canPlayerMove(boardAfterAITurn, colors[0].name)
        )
      ) {
        activeAIPlayer = activeAIPlayer > 2 ? 1 : activeAIPlayer + 1;
        playAITurn(activeAIPlayer, boardAfterAITurn);
      } else {
        setAITurn(false);
      }
    }, AI_DELAY);
  };

  return (
    <SafeAreaView style={commonStyles.body}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={commonStyles.scrollView}>
        <Animated.View style={[styles.container, initAnimationStyle]}>
          {gameBoard.map((row, index) => {
            return (
              <View style={styles.row} key={'row-' + index}>
                {row.map((column, colIndex) => {
                  return (
                    <Square
                      column={column}
                      playerColor={colors[0].color}
                      key={'col-' + index + '-' + colIndex}
                      fireEvent={() => {
                        if (isAITurn) {
                          return;
                        }
                        const newBoard = selectSlot(
                          index,
                          colIndex,
                          gameBoard,
                          colors[0].name,
                        );
                        if (newBoard) {
                          setGameOver(isGameOver(newBoard));
                          if (
                            !gameOver &&
                            gameBoard[index][colIndex] === 'selectable'
                          ) {
                            setAITurn(true);
                            playAITurn(1, newBoard);
                          } else {
                            setGameBoard(newBoard);
                          }
                        }
                      }}
                    />
                  );
                })}
              </View>
            );
          })}
        </Animated.View>
        <Status board={gameBoard} gameOver={gameOver} colors={colors} />
        <Button onPress={() => navigation.navigate('Help')} title="Help" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Board;
