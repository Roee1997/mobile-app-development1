import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const [name, setName] = useState("");
  const disabledButton = name.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ברוכים הבאים לאפליקציית ניהול המשימות</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>אנא הזן את שמך לפני שנתחיל:</Text>
        <TextInput
          style={styles.input}
          placeholder="הזן את שמך כאן"
          value={name}
          onChangeText={setName}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, disabledButton && styles.disabledButton]}
        disabled={disabledButton}
        onPress={() => navigate("TaskList", { name })}
      >
        <Text style={styles.buttonText}>עבור לרשימת המשימות</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
