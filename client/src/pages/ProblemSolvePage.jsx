import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getProblemBySlug from "../components/api/getProblemBySlug";
import ProblemSolve from "./ProblemSolve";

const ProblemSolvePage = () => {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProblem() {
      try {
        const data = await getProblemBySlug(slug);
        setProblem(data);
      } catch (err) {
        setError("Failed to load problem");
      } finally {
        setLoading(false);
      }
    }
    fetchProblem();
  }, [slug]);

  if (loading) return <p style={{ padding: 20 }}>Loading problem...</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  return <ProblemSolve problem={problem} />;
};

export default ProblemSolvePage;
