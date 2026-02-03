import axios from "axios";

const getProblems = async () => {

  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Make an API call to validate the token and get user info
      const response = await axios.get('http://localhost:3000/problems', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default getProblems;