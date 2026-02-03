import axios from "axios";
import getProblems from "../components/api/problemList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {

  const [problemsList, setProblemsList] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const list = await getProblems();
      setProblemsList(list);
      // console.log(list);
    }
    fetchProblems();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(res.data.message);
    // window.location.href = '/login';
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={fetchProfile}>Access Protected Route</button>
      {props.isLoggedIn ?
        <li>
          <Link to="/create-problem">Create Problem</Link>
        </li>
        : null}
    </div>
  );
};

export default Home;
