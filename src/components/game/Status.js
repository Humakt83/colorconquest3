import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getSlotsByType} from '../../logic/conquest';

const Status = (props) => {
  const getVictor = (board) => {
    const colorMap = props.colors.map((color) => {
      return {
        name: color.name.toUpperCase(),
        color: color.color,
        slots: getSlotsByType(board, color.name),
      };
    });
    const winner = colorMap.reduce((prev, next) =>
      prev.slots > next.slots ? prev : next,
    );
    return colorMap.filter((val) => val.slots.length === winner.slots.length)
      .length > 1 ? (
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
        {props.colors.map((color) => {
          return (
            <Text
              style={[styles.status, {color: color.color}]}
              key={color.name}>
              {color.name.toUpperCase()}:{' '}
              {getSlotsByType(props.board, color.name).length}
            </Text>
          );
        })}
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
});

export default Status;
