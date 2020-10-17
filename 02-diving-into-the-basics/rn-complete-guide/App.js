import { StatusBar } from 'expo-status-bar';
//import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);


  const addGoalHandler = goalTitle => {
    //setCourseGoals([...setCourseGoals, enteredGoal]);
    /**
     * Same as the above but this is always guaranteed to give you
     * the latest state snapshot before it then applies your state
     */
    setCourseGoals(currentGoals => [...currentGoals, { key: Math.random().toString(), value: goalTitle }])
  };


  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  return (
    <View style={styles.screen}>
      <GoalInput onAddGoal={addGoalHandler}/>
      <FlatList data={courseGoals} renderItem={itemData =>
        <GoalItem title={itemData.item.value} id={item.data.item.id} onDelete={removeGoalHandler} />
      }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});

