import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getProblems from "../components/api/problemList";
import styles from "./Home.module.css";

const Home = (props) => {
  const [problemsList, setProblemsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const list = await getProblems();
        setProblemsList(list);
      } catch (err) {
        console.error("Failed to fetch problems", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Problems</h1>

        {props.isLoggedIn && (
          <Link to="/create-problem" className={styles.createBtn}>
            + Create Problem
          </Link>
        )}
      </div>

      {loading ? (
        <p className={styles.status}>Loading problems...</p>
      ) : problemsList.length === 0 ? (
        <p className={styles.status}>No problems available</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {problemsList.map((problem, index) => (
              <tr key={problem._id || index}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/problems/${problem.slug}`}
                    className={styles.problemLink}
                  >
                    {problem.title}
                  </Link>
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${styles[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td>
                  {problem.tags?.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
