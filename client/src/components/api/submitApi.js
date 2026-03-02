import axios from "axios";

const handleSubmitApi = async (language, code, slug) => {

  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Make an API call to validate the token and get user info
      const response = await axios.post(`http://localhost:3000/submit`,
        {
          language,
          code,
          slug
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default handleSubmitApi;
