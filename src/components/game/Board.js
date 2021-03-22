import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import GradientButton from '../common/GradientButton';
import {selectSlot, isGameOver, canPlayerMove} from '../../logic/conquest';
import {makeAIMove, makeAIPersonalities} from '../../logic/ai';
import Status from './Status';
import Square from './Square';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';
import {commonStyles} from '../common';
import {
  SPEED,
  SettingsBus,
  readSettings,
  SETTINGS_SPEED_KEY,
  EVENT_SPEED,
} from '../../settings-util';

let aiTimer;

const Board = ({navigation, route}) => {
  const [gameBoard, setGameBoard] = useState(route.params.board);
  const [colors, setColors] = useState(route.params.colors);
  const [isAITurn, setAITurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const rotation = useSharedValue(0);
  const [containerLayoutStyle, setContainerLayoutStyle] = useState(
    styles.container,
  );

  const [speed, setSpeed] = useState(SPEED.medium);

  const [aiPlayers, setAIPlayers] = useState(
    makeAIPersonalities(route.params.colors),
  );

  useEffect(() => {
    rotation.value = withSequence(
      withSpring(5),
      withSpring(-5),
      withSpring(0, {duration: 50}),
    );
    setGameBoard(route.params.board);
    setColors(route.params.colors);
    setAITurn(false);
    setAIPlayers(makeAIPersonalities(route.params.colors));
    setGameOver(false);
    return () => clearTimeout(aiTimer);
  }, [route.params.board, route.params.colors]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    SettingsBus.listen('Speed', (event, value) => {
      if (event === EVENT_SPEED) {
        setSpeed(value);
      }
    });
    return () => SettingsBus.remove('Speed');
  }, []);

  const initAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  readSettings(SETTINGS_SPEED_KEY, setSpeed);

  const playAITurn = (activeAIPlayer, boardAfterAITurn) => {
    aiTimer = setTimeout(() => {
      boardAfterAITurn = makeAIMove(
        boardAfterAITurn,
        aiPlayers[activeAIPlayer].name,
        colors[0].name,
        aiPlayers[activeAIPlayer].aiType,
      );
      setGameOver(isGameOver(boardAfterAITurn));
      setGameBoard(boardAfterAITurn);
      if (
        !isGameOver(boardAfterAITurn) &&
        !(
          activeAIPlayer === 2 &&
          canPlayerMove(boardAfterAITurn, colors[0].name)
        )
      ) {
        activeAIPlayer = activeAIPlayer > 1 ? 0 : activeAIPlayer + 1;
        playAITurn(activeAIPlayer, boardAfterAITurn);
      } else {
        setAITurn(false);
      }
    }, speed);
  };

  const changeContainerStyle = () => {
    const {width, height} = Dimensions.get('window');
    if (width > height) {
      setContainerLayoutStyle(styles.containerLandscape);
    } else {
      setContainerLayoutStyle(styles.container);
    }
  };

  return (
    <SafeAreaView style={commonStyles.body} onLayout={changeContainerStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={commonStyles.scrollView}>
        <View style={containerLayoutStyle}>
          <Animated.View style={[styles.boardContainer, initAnimationStyle]}>
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
                            setGameBoard(newBoard);
                            if (
                              !gameOver &&
                              gameBoard[index][colIndex] === 'selectable'
                            ) {
                              setAITurn(true);
                              playAITurn(0, newBoard);
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
          <View style={styles.statusAndButtons}>
            <Status board={gameBoard} gameOver={gameOver} colors={colors} />
            <GradientButton
              onPress={() => navigation.navigate('Settings')}
              title="Settings"
            />
            <GradientButton
              onPress={() => navigation.navigate('Help')}
              title="Help"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  container: {
    flex: 0,
  },
  containerLandscape: {
    flex: 1,
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  statusAndButtons: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 180,
  },
});

export default Board;
