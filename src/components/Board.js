import React, { useState } from 'react';
import {View, StyleSheet, ColorPropType} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {buildBoard} from './../conquest';
import {COLORS} from './../constants';

const Board = () => {
    const [board, setBoard] = useState(buildBoard());

    return (
        <View style={styles.container}>
            {
                board.map((row, index) => {
                    return (
                        <View style={styles.row} key={'row-' + index}>
                        {row.map((column, colIndex) => {
                            const squareStyle = column === 1 ? styles.SquareBlue : column === -1 ? styles.SquareRed : styles.Square;
                            return (
                                <View style={squareStyle} key={'col-' + index + '-' + colIndex}/>
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
}

const SquareBlue = Object.assign({}, Square, {backgroundColor: COLORS.blue})
const SquareRed = Object.assign({}, Square, {backgroundColor: COLORS.red})

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
    SquareRed
});

export default Board;