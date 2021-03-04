import React, { useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {buildBoard, selectSlot, makeAIMove, isGameOver, canPlayerMove} from './../conquest';
import {COLORS} from './../constants';

const Board = () => {
    const [gameBoard, setGameBoard] = useState(buildBoard());
    const [isAITurn, setAITurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    return (
        <View>
            <View style={styles.container}>
                {
                    gameBoard.map((row, index) => {
                        return (
                            <View style={styles.row} key={'row-' + index}>
                            {row.map((column, colIndex) => {
                                const squareStyle = colorSquareMap[column];
                                return (
                                    <View style={squareStyle} key={'col-' + index + '-' + colIndex} onTouchStart={() => {                                    
                                        if (isAITurn) {
                                            return;
                                        }
                                        const newBoard = selectSlot(index, colIndex, gameBoard);
                                        if (!!newBoard) {
                                            setGameOver(isGameOver(newBoard));
                                            if (!gameOver && gameBoard[index][colIndex] === 'selectable') {
                                                setAITurn(true);
                                                let boardAfterAITurn;
                                                do {
                                                    boardAfterAITurn = makeAIMove(newBoard);
                                                } while (!isGameOver(boardAfterAITurn) && !canPlayerMove(boardAfterAITurn));
                                                setGameOver(isGameOver(boardAfterAITurn));
                                                setGameBoard(boardAfterAITurn);
                                                setAITurn(false);
                                            } else {
                                                setGameBoard(newBoard);
                                            }
                                        }
                                    }}/>
                                )
                            })}
                            </View>
                        )
                    })
                }
            </View>
            <View>
                <Text>{gameOver ? 'Game Over' : ''}</Text>
            </View>
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