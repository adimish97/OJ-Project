import axios from "axios";

const handleRunApi = async (language, code, customInput) => {

  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Make an API call to validate the token and get user info
      const response = await axios.post(`http://localhost:3000/run`,
        {
          language,
          code,
          customInput
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        });
      return response.data.output;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default handleRunApi;
