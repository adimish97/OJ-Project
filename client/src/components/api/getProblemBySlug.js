import axios from "axios";

const getProblemBySlug = async (slug) => {

  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Make an API call to validate the token and get user info
      const response = await axios.get(`http://localhost:3000/problems/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default getProblemBySlug;
