import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from './../constants';

const Square = (props) => {

    return (
        <View style={colorSquareMap[props.column]} onTouchStart={props.fireEvent}/>
    )
}

const SquareStyle = {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#111111',
    borderWidth: 2,
    margin: 1
};

const SquareBlue = Object.assign({}, SquareStyle, {backgroundColor: COLORS.blue});
const SquareRed = Object.assign({}, SquareStyle, {backgroundColor: COLORS.red});
const SquareGreen = Object.assign({}, SquareStyle, {backgroundColor: COLORS.green});
const SquareBrown = Object.assign({}, SquareStyle, {backgroundColor: COLORS.brown});
const SquareSelectable = Object.assign({}, SquareStyle, {backgroundColor: COLORS.lightblue})
const SquareBlocked = Object.assign({}, SquareStyle, {backgroundColor: COLORS.lightgrey, borderColor: COLORS.lightgrey})

const styles = StyleSheet.create({
    SquareStyle,
    SquareBlue,
    SquareRed,
    SquareGreen,
    SquareBrown,
    SquareSelectable,
    SquareBlocked
});

const colorSquareMap = {
    blue: styles.SquareBlue, 
    red: styles.SquareRed, 
    none: styles.SquareStyle, 
    selectable: styles.SquareSelectable, 
    green: styles.SquareGreen, 
    brown: styles.SquareBrown, 
    blocked: styles.SquareBlocked
};

export default Square;
