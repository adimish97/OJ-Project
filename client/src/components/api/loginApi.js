import axios from "axios";

const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = res.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    // Axios puts server errors inside error.response
    const message =
      error.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};

export default loginUser;
