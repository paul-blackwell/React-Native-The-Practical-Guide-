import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min); // convert to an init (round up)
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    /**
     * If rndNum is the same as exclude fun the function agin 
     * but against itself 
     * 
     * Note: Calling a function from inside the same function is called
     * recursion.
     */
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}


const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
};

const styles = StyleSheet.create({});

export default GameScreen;