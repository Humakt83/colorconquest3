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

  const SquareBlue = Object.assign({}, SquareStyle, {
    backgroundColor: COLORS.blue,
  });
  const SquareRed = Object.assign({}, SquareStyle, {
    backgroundColor: COLORS.red,
  });
  const SquareGreen = Object.assign({}, SquareStyle, {
    backgroundColor: COLORS.green,
  });
  const SquareBrown = Object.assign({}, SquareStyle, {
    backgroundColor: COLORS.brown,
  });
  const SquarePurple = Object.assign({}, SquareStyle, {
    backgroundColor: COLORS.purple,
  });
  const SquareOrange = Object.assign({}, SquareStyle, {
    backgroundColor: COLORS.orange,
  });
  const SquareSelectable = Object.assign({}, SquareStyle, {
    backgroundColor: props.playerColor,
    opacity: 0.4,
  });
  const SquareBlocked = Object.assign({}, SquareStyle, {
    backgroundColor: COLORS.lightgrey,
    borderColor: COLORS.lightgrey,
  });

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
      style={[colorSquareMap[props.column], changeColorStyle]}
      onTouchStart={props.fireEvent}
      testID="square"
    />
  );
};

export default Square;
