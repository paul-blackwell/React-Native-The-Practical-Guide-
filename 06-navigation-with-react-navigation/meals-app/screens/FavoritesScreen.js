import React from 'react';
import MealItem from '../components/MealItem';

import MealList from '../components/MealsList';
import {MEALS} from '../data/dummy-data';


const FavoritesScreen = props => {
    const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2'); // Dummy logic
    return <MealList listData={favMeals} navigation={props.navigation}/>;
};

FavoritesScreen.navigationOptions = {
    headerTitle: 'Your Favorites'
};



export default FavoritesScreen;