import axios from "axios";

const registerUser = async (email, password, firstname, lastname) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/register",
      { email, password, firstname, lastname },
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
    const message =
      error.response?.data?.message || "Registration failed";
    throw new Error(message);
  }
};

export default registerUser;
