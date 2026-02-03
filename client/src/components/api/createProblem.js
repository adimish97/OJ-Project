import axios from "axios";

const createProblem = async (problemData) => {

  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.post(
        "http://localhost:3000/problems/create",
        problemData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // protected route
          },
        }
      );
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default createProblem;