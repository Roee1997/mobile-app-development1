import React, { useEffect, useState } from "react";
import { View, FlatList, Button, StyleSheet, Text } from "react-native";
import TaskItem from "../components/TaskItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import tasksData from "../mockData/tasksData.json";

export default function TaskListScreen() {
  const { navigate } = useNavigation();
  const {
    params: { name },
  } = useRoute();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        //Replace with fetch
        const data = tasksData;
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = () => {
    navigate("AddEditTask", { tasks, setTasks });
  };

  const onPressDelete = (id) =>
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>שלום {name}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigate("TaskDetails", { task: item, updateTask })}
            onPressDelete={(id) => onPressDelete(id)}
          />
        )}
      />
      <Button title="הוסף משימה חדשה" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
