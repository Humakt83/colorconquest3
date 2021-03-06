import React, { useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import {selectSlot, makeAIMove, isGameOver, canPlayerMove} from './../conquest';
import Status from './Status';
import Square from './Square';

const Board = (props) => {
    const [gameBoard, setGameBoard] = useState(props.game.board);
    const [isAITurn, setAITurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setGameBoard(props.game.board);
        setAITurn(false);
        setGameOver(false);
    }, [props])

    return (
        <View>
            <View style={styles.container}>
                {
                    gameBoard.map((row, index) => {
                        return (
                            <View style={styles.row} key={'row-' + index}>
                            {row.map((column, colIndex) => {
                                return (
                                    <Square column={column} key={'col-' + index + '-' + colIndex} fireEvent={() => {
                                        if (isAITurn) {
                                            return;
                                        }
                                        const newBoard = selectSlot(index, colIndex, gameBoard);
                                        if (!!newBoard) {
                                            setGameOver(isGameOver(newBoard));
                                            if (!gameOver && gameBoard[index][colIndex] === 'selectable') {
                                                setAITurn(true);
                                                const aiturns = ['green', 'red', 'brown']
                                                let boardAfterAITurn = newBoard;
                                                do {
                                                    aiturns.forEach(color => {
                                                        boardAfterAITurn = makeAIMove(boardAfterAITurn, color);
                                                    })
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
            <Status board={gameBoard} gameOver={gameOver} />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',        
    },
});

export default Board;