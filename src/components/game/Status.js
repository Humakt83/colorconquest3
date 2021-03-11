import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, PLAYERS} from '../../constants';
import {getSlotsByType} from '../../logic/conquest';

const Status = (props) => {
  const getVictor = (board) => {
    const colorMap = [
      {
        name: PLAYERS.playerBlue.name,
        color: COLORS.blue,
        slots: getSlotsByType(board, PLAYERS.playerBlue.color),
      },
      {
        name: PLAYERS.playerRed.name,
        color: COLORS.red,
        slots: getSlotsByType(board, PLAYERS.playerRed.color),
      },
      {
        name: PLAYERS.playerBrown.name,
        color: COLORS.brown,
        slots: getSlotsByType(board, PLAYERS.playerBrown.color),
      },
      {
        name: PLAYERS.playerGreen.name,
        color: COLORS.green,
        slots: getSlotsByType(board, PLAYERS.playerGreen.color),
      },
    ];
    const winner = colorMap.reduce((prev, next) =>
      prev.slots > next.slots ? prev : next,
    );
    return colorMap.filter((val) => val.slots === winner.slots).length > 1 ? (
      'Game Over! DRAW!'
    ) : (
      <Text style={{color: winner.color}}>
        Game Over! {winner.name} is WINNER!
      </Text>
    );
  };

  return (
    <>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, styles.statusBlue]}>
          BLUE: {getSlotsByType(props.board, 'blue').length}
        </Text>
        <Text style={[styles.status, styles.statusRed]}>
          RED: {getSlotsByType(props.board, 'red').length}
        </Text>
        <Text style={[styles.status, styles.statusGreen]}>
          GREEN: {getSlotsByType(props.board, 'green').length}
        </Text>
        <Text style={[styles.status, styles.statusBrown]}>
          BROWN: {getSlotsByType(props.board, 'brown').length}
        </Text>
      </View>
      <Text style={styles.gameOver}>
        {props.gameOver ? getVictor(props.board) : ''}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontWeight: '700',
    marginRight: 5,
  },
  gameOver: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
  },
  statusGreen: {
    color: COLORS.green,
  },
  statusRed: {
    color: COLORS.red,
  },
  statusBlue: {
    color: COLORS.blue,
  },
  statusBrown: {
    color: COLORS.brown,
  },
});

export default Status;
