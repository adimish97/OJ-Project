const registerUser = async (email, password, firstname, lastname) => {
  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, firstname, lastname }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } else {
    throw new Error(data.message);
  }
};
export default registerUser;