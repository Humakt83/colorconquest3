import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants';

const GradientButton = (props) => {
  const buttonStyle = props.disabled
    ? [styles.button, styles.disabled]
    : styles.button;

  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <LinearGradient
        colors={[COLORS.lightblue, COLORS.blue]}
        style={buttonStyle}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 10,
    width: 130,
    borderRadius: 5,
    borderColor: COLORS.white,
    borderWidth: 3,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
  },
});

export default GradientButton;
