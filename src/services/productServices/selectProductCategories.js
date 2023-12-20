import { API_URL } from '@env';

const fetchCategories = async () => {
    try {
      const response = await fetch(
        API_URL+"/product/select_products_categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); 
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const uniqueFamiliesAndCategories = Array.from(
        new Set(data.map((item) => item.id_family))
      ).map((familyId) => {
        return data.find((item) => item.id_family === familyId);
      });
  
      return uniqueFamiliesAndCategories;
    } catch (error) {
      console.error("Error during fetch request:", error);
      throw error;
    }
  };
  
  const fetchAllCategories = async () => {

        try {
          const response = await fetch(
            API_URL+"/product/select_products_categories",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();

      
          return data;
        } catch (error) {
          console.error("Error during fetch request:", error);
          throw error;
        }
      };
  
  export { fetchCategories, fetchAllCategories };
  