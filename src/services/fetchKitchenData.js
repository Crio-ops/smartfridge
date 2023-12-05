import sendRequest from "./sendRequest.js";

const fetchKitchenData = async (user, token) => {
  const jsonRequest = JSON.stringify({ user_id: user.id });

  const LOCAL_URL =
    "http://192.168.1.56:3001/routes/product/fetch_user_kitchen_data";

  try {
    const response = await sendRequest(
      LOCAL_URL,
      "POST",
      {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      jsonRequest
    );
    const result = response.request.kitchen.kitchenData;
    return result;
    //   if (response.status === 200) {

    //     if (json.request.kitchen.kitchen_name === "") {
    //       setNoKitchenYet(true);
    //     } else {
    //       console.log(json.request.kitchen);
    //       setKitchen(json.request.kitchen);
    //       setKitchenName(json.request.kitchen.kitchen_name);
    //       setNoKitchenYet(false);
    //     }
    //   } else {
    //     // Handle other response statuses here if needed
    //     console.error("Unexpected response status:", response.status);
    //   }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
};

export default fetchKitchenData;
