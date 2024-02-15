import { API_URL } from '@env';
const updateKitchenName = async (kitchenName, adminId, token) => {
    const jsonRequest = JSON.stringify({
      kitchen_name: kitchenName,
      admin_id: adminId,
    });
  
  
    try {
      const response = await fetch(API_URL + "/product/update_kitchen_name", {
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
  
  export default updateKitchenName;
  