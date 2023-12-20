import { API_URL } from '@env';

const handleCreateRecipe = async (data) => {

    try {
      const response = await fetch(
        API_URL+"/recipes/create_recipe",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data}),
        }
      );

      if (response.ok) {
        return response
      } else {
        console.error("Error creating recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  export default handleCreateRecipe