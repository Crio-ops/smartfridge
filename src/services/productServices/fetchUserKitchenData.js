import { API_URL } from '@env';

const fetchUserKitchenData = async (user, token) => {
    const jsonRequest = JSON.stringify({ user_id: user.id });

    try {
      const response = await fetch(API_URL + "/product/fetch_user_kitchen_data", {
        method: "POST",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonRequest,
      });
  
      if (response.status === 200) {
        const json = await response.json();
        return json.request.kitchen;
      } else {
        console.error("Unexpected response status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      return null;
    }
  };
  
  export default fetchUserKitchenData;
  