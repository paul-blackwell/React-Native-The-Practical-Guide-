import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const CategoriesScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The Categories Screen</Text>
            <Button title="Go to Meals" onPress={() => {
                props.navigation.navigate({routeName: 'CategoryMeals'});
                // props.navigation.replace({routeName: 'CategoryMeals'}); would use this on a login screen if you didn't want the user to go back
            }}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CategoriesScreen;