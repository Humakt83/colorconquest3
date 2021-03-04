import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from './../constants';
import {getSlotsByType} from './../conquest';

const Status = (props) => {

    return (
        <View style={{fontWeight: 'bold'}}>            
            <Text style={{color: COLORS.blue, fontWeight: '700'}}>BLUE: {getSlotsByType(props.board, 'blue').length}</Text>
            <Text style={{color: COLORS.red,  fontWeight: '700'}}>RED: {getSlotsByType(props.board, 'red').length}</Text>
            <Text style={{color: COLORS.green,  fontWeight: '700'}}>GREEN: {getSlotsByType(props.board, 'green').length}</Text>
            <Text style={{color: COLORS.brown,  fontWeight: '700'}}>BROWN: {getSlotsByType(props.board, 'brown').length}</Text>
            <Text style={{fontWeight: '700'}}>{props.gameOver ? 'Game Over' : ''}</Text>
        </View>
    );
}

export default Status;