const sendRequest = async (url, method, headers, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });
  
      if (response.status === 200) {
        return await response.json();
      } else if (response.status === 500) {
        // setServerError(true);
        // setLoginError(false);
        throw new Error("Internal error " + response.status);
      } else {
        // setLoginError(true);
        // setServerError(false);
        throw new Error("Login error " + response.status);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  };

  export default sendRequest