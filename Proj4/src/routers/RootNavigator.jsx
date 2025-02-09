import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import TaskListScreen from "../screens/TaskScreen";
import TaskDetailsScreen from "../components/TaskDetails";
import AddEditTaskScreen from "../screens/AddEditTaskScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="AddEditTask" component={AddEditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
