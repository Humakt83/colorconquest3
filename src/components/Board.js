import React, { useState } from 'react';
import {View, StyleSheet, ColorPropType} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {buildBoard, selectSlot} from './../conquest';
import {COLORS} from './../constants';

const Board = () => {
    const [gameBoard, setGameBoard] = useState(buildBoard());

    return (
        <View style={styles.container}>
            {
                gameBoard.map((row, index) => {
                    return (
                        <View style={styles.row} key={'row-' + index}>
                        {row.map((column, colIndex) => {
                            const squareStyle = colorSquareMap[column];
                            return (
                                <View style={squareStyle} key={'col-' + index + '-' + colIndex} onTouchStart={() => {                                    
                                    const newBoard = selectSlot(index, colIndex, gameBoard);
                                    if (!!newBoard) {
                                        setGameBoard(newBoard);
                                    }
                                }}/>
                            )
                        })}
                        </View>
                    )
                })
            }
        </View>
    );
}

const Square = {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#111111',
    borderWidth: 2,
    margin: 1
};

const SquareBlue = Object.assign({}, Square, {backgroundColor: COLORS.blue});
const SquareRed = Object.assign({}, Square, {backgroundColor: COLORS.red});
const SquareSelectable = Object.assign({}, Square, {backgroundColor: COLORS.lightblue})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAAAAA',
    },
    row: {
        flex: 1,
        flexDirection: 'row',        
    },
    Square,
    SquareBlue,
    SquareRed,
    SquareSelectable
});

const colorSquareMap = {blue: styles.SquareBlue, red: styles.SquareRed, none: styles.Square, selectable: styles.SquareSelectable};

export default Board;