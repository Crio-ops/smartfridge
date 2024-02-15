import { API_URL } from '@env';

export const fetchRecipes = async () => {
  try {
    const response = await fetch(API_URL + "/recipes/select_recipes_list");
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
