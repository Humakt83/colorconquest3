import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from './../constants';
import {getSlotsByType} from './../conquest';

const Status = (props) => {

    const getVictor = (board) => {
        const colorMap = [
            {name: 'Blue', color: COLORS.blue, slots: getSlotsByType(board, 'blue')},
            {name: 'Red', color: COLORS.red, slots: getSlotsByType(board, 'red')},
            {name: 'Brown', color: COLORS.brown, slots: getSlotsByType(board, 'brown')},
            {name: 'Green', color: COLORS.green, slots: getSlotsByType(board, 'green')}
        ];
        const winner = colorMap.reduce((prev, next) => prev.slots > next.slots ? prev : next);
        return colorMap.filter((val) => val.slots === winner.slots).length > 1 ? 'Game Over! DRAW!' : <Text style={{color: winner.color}}>Game Over! {winner.name} is WINNER!</Text>;
    }

    return (
        <>
            <View style={styles.statusContainer}>            
                <Text style={[styles.status,{color: COLORS.blue}]}>BLUE: {getSlotsByType(props.board, 'blue').length}</Text>
                <Text style={[styles.status, {color: COLORS.red,  fontWeight: '700'}]}>RED: {getSlotsByType(props.board, 'red').length}</Text>
                <Text style={[styles.status, {color: COLORS.green,  fontWeight: '700'}]}>GREEN: {getSlotsByType(props.board, 'green').length}</Text>
                <Text style={[styles.status, {color: COLORS.brown,  fontWeight: '700'}]}>BROWN: {getSlotsByType(props.board, 'brown').length}</Text>
            </View>
            <Text style={styles.gameOver}>{props.gameOver ? getVictor(props.board) : ''}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    statusContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        fontWeight: '700',
        marginRight: 5
    },
    gameOver: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24
    }
});

export default Status;