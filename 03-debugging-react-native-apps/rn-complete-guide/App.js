import { StatusBar } from 'expo-status-bar';
//import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);


  const addGoalHandler = goalTitle => {
    //setCourseGoals([...setCourseGoals, enteredGoal]);
    /**
     * Same as the above but this is always guaranteed to give you
     * the latest state snapshot before it then applies your state
     */

    if (goalTitle === 0) {
      return;
    }
    setCourseGoals(
      currentGoals =>
        [...currentGoals, { key: Math.random().toString(), value: goalTitle }]
    );
    setIsAddMode(false);
  };


  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };


  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      <FlatList data={courseGoals} renderItem={itemData =>
        <GoalItem title={itemData.item.value} id={itemData.item.id} onDelete={removeGoalHandler} />
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

