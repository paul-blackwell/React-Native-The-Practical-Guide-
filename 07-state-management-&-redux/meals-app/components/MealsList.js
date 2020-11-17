import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import MealItem from '../components/MealItem';


const MealList = props => {

    // This will render each meal item 
    const renderMealItem = itemData => {
        return (
            <MealItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail',
                        params: {
                            mealId: itemData.item.id
                        }
                    })
                }} />)
            ;
    };



    return (
        <View style={styles.list}>
            <FlatList
                style={{ width: '100%' }}
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem} />
        </View>
    )
};


const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16
    }
});

export default MealList;
