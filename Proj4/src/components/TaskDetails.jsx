import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function TaskDetailsScreen() {
  const { goBack } = useNavigation();
  const {
    params: { task, updateTask },
  } = useRoute();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const saveChanges = () => {
    updateTask(task.id, { title, description });
    setIsEditing(false);
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>פרטי המשימה</Text>
        <TouchableOpacity
          onPress={() => (isEditing ? saveChanges() : setIsEditing(!isEditing))}
        >
          <MaterialIcons
            name={isEditing ? "done" : "edit"}
            size={28}
            color="#007BFF"
          />
        </TouchableOpacity>
      </View>

      {isEditing ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="ערוך כותרת"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="ערוך תיאור"
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>שמור שינויים</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
