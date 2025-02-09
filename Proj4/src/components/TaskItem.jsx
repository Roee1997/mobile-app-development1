import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function TaskItem({ task, onPress, onPressDelete }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => onPressDelete(task.id)}
      >
        <MaterialIcons name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>
      <Text style={styles.title}>{task.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
  },
  iconContainer: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
