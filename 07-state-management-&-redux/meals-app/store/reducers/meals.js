import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE } from '../actions/meals';



const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};


const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1); // take updatedFavMeals index, edit it and remove the item at this index
                return { ...state, favoriteMeals: updatedFavMeals }
            } else { 
                // if we are not finding a product so we want to add it
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
            }
        default:
            return state;
    }
}

export default mealsReducer;