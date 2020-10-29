import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';


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

// For ScrollView
// const renderListItem = (value, numOfRound) => (
//     <View key={value} style={styles.listItem}>
//         <BodyText>#{numOfRound}</BodyText>
//         <Text>{value}</Text>
//     </View>
// );

// For FlatList
const renderListItem = (listLength,itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <Text>{itemData.item}</Text>
    </View>
);




const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    /**
     * Runs after every render cycle
     * Effect will only rerun if of the dependencies
     * [currentGuess, userChoice, onGameOver] outside the function change 
     */
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandle = direction => {

        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [{ text: 'Sorry!', style: 'cancel' }]
            );
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandle.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandle.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                keyExtractor={(item) => item} 
                data={pastGuesses} 
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
    },
    listContainer: {
        flex: 1, // if ScrollView is a child of a view you need this to make it scroll on android
        // width: '80%',
        width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '60%',
        width: '100%'
    }
});

export default GameScreen;