import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ToDo(props) {
  const [newTodo, setNewTodo] = useState("");

  const {
    todoItems,
    onAddTodo,
    onDeleteTodo,
    title,
    textInputPlaceholder,
    addTaskButtonText,
    deleteTaskButtonText,
    todoItemStyle,
  } = props;

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      onAddTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    onDeleteTodo(newTodoItems);
  };

  return (
    <View style={styles.todoContainer}>
      <View>
        <Text>{title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={textInputPlaceholder}
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <Button title={addTaskButtonText} onPress={handleAddTodo} />
        </View>
        {todoItems.map((todo, index) => (
          <View key={index} style={[styles.todoItem, todoItemStyle]}>
            <Text>
              {index + 1}. {todo}
            </Text>
            <Button
              title={deleteTaskButtonText}
              onPress={() => handleDeleteTodo(index)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
});
