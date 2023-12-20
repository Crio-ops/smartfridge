import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity  } from 'react-native';
import RegularButtonComponent from './elements/button/regularButtonComponent.js';
const RecipeList = ({ recipes, navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchRecipes();
      }
  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
    onPress={() => navigation.navigate('ShowRecipe', {item})}
    >
    <View style={{ marginVertical: 10, paddingHorizontal: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ fontSize: 16, color: 'gray' }}>{item.description}</Text>
      {/* Ajoutez d'autres informations de recette si nécessaire */}
    </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderRecipeItem}
    />
  );
};

export default RecipeList;
