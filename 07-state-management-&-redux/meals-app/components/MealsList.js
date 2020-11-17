import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';


const MealList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    // This will render each meal item 
    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);

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
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
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
