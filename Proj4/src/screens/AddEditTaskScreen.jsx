import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function AddEditTaskScreen() {
  const { goBack } = useNavigation();
  const {
    params: { tasks, setTasks },
  } = useRoute();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), title, description }]);
    goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="כותרת משימה"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="תיאור משימה"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="שמור" onPress={saveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
