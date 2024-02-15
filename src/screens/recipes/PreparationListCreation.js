import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GradientBackground from "../../styles/components/GradientBackground.js";
import ToDo from "../../components/toDoComponent/ToDo.js";

const PreparationListCreation = () => {
  const [todoItems, setTodoItems] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodoItems([...todoItems, newTodo]);
  };

  const handleDeleteTodo = (newTodoItems) => {
    setTodoItems(newTodoItems);
  };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <ToDo
        title="Etapes de préparation :"
        textInputPlaceholder="ajouter une étape de préparation"
        addTaskButtonText="ajouter"
        deleteTaskButtonText="retirer"
        todoItems={todoItems} // Passer todoItems en tant que prop
        onAddTodo={handleAddTodo} // Passer la fonction de mise à jour
        onDeleteTodo={handleDeleteTodo} // Passer la fonction de suppression
        todoItemStyle={styles.customTodoItemStyle}
      />
      {todoItems.map((todo, index) => (
          <View key={index}>
            <Text>
              {index + 1}. {todo}
            </Text>
            </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderColor: "red",
  },

  customTodoItemStyle: {
    backgroundColor: "#f0f0f0",
    borderColor: "red",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default PreparationListCreation;
