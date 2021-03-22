import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Square = (props) => {
  const SquareStyle = {
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    borderColor: '#111111',
    borderWidth: 2,
    margin: 1,
  };

  const SquareBlue = {
    backgroundColor: COLORS.blue,
  };
  const SquareRed = {
    backgroundColor: COLORS.red,
  };
  const SquareGreen = {
    backgroundColor: COLORS.green,
  };
  const SquareBrown = {
    backgroundColor: COLORS.brown,
  };
  const SquarePurple = {
    backgroundColor: COLORS.purple,
  };
  const SquareOrange = {
    backgroundColor: COLORS.orange,
  };
  const SquareSelectable = {
    backgroundColor: props.playerColor,
    opacity: 0.4,
  };
  const SquareBlocked = {
    backgroundColor: COLORS.lightgrey,
    borderColor: COLORS.lightgrey,
  };

  const styles = StyleSheet.create({
    SquareStyle,
    SquareBlue,
    SquareRed,
    SquareGreen,
    SquareBrown,
    SquareSelectable,
    SquareBlocked,
    SquareOrange,
    SquarePurple,
  });

  const colorSquareMap = {
    blue: styles.SquareBlue,
    red: styles.SquareRed,
    none: styles.SquareStyle,
    selectable: styles.SquareSelectable,
    green: styles.SquareGreen,
    brown: styles.SquareBrown,
    blocked: styles.SquareBlocked,
    orange: styles.SquareOrange,
    purple: styles.SquarePurple,
  };

  const animatedStyle = useSharedValue(
    colorSquareMap[props.column].backgroundColor,
  );

  useEffect(() => {
    animatedStyle.value = colorSquareMap[props.column].backgroundColor;
  });

  const changeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(animatedStyle.value),
    };
  });

  return (
    <Animated.View
      style={[
        styles.SquareStyle,
        colorSquareMap[props.column],
        changeColorStyle,
      ]}
      onTouchStart={props.fireEvent}
      testID="square"
    />
  );
};

export default Square;
