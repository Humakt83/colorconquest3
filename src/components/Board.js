import React, { useState, useEffect } from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {selectSlot, makeAIMove, isGameOver, canPlayerMove} from './../conquest';
import Status from './Status';
import Square from './Square';
import Animated, {useAnimatedStyle, withSpring, withSequence, useSharedValue} from 'react-native-reanimated';
import {commonStyles} from './common';

const Board = ({navigation, route}) => {
    const [gameBoard, setGameBoard] = useState(route.params.board);
    const [isAITurn, setAITurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withSequence(
            withSpring(5),
            withSpring(-5),
            withSpring(0, {duration: 50}));
        setGameBoard(route.params.board);
        setAITurn(false);
        setGameOver(false);
    }, [route.params.board]);

    const initAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotateZ: `${rotation.value}deg`}]
        }
    });

    return (
        <SafeAreaView style={commonStyles.body}>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={commonStyles.scrollView}>
                <Animated.View style={[styles.container, initAnimationStyle]}>
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
                </Animated.View>
                <Status board={gameBoard} gameOver={gameOver} />
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{translateX: -50}]
    },
    row: {
        flex: 1,
        flexDirection: 'row',        
    },
});

export default Board;