import { useState } from "react";
import styles from "./ProblemSolve.module.css";
import ProblemPreview from "./ProblemPreview";
import handleRunApi from "../components/api/compilerApi";
import Editor from "@monaco-editor/react";

const ProblemSolve = ({ problem }) => {

  const cppTemplate = `#include <iostream>
    using namespace std;

    int main() {
        // write your code here
        return 0;
    }`;

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(cppTemplate);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    setError("");

    try {
      // const res = await axios.post(
      //   "http://localhost:3000/run",
      //   {
      //     language,
      //     code,
      //     // input: customInput,
      //     // problemId: problem._id,
      //   }
      // );
      const res = await handleRunApi(language, code, customInput);

      setOutput(res);
    } catch (err) {
      setError(
        err.response?.data?.message || "Error while executing code"
      );
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    // try {
    //   setSubmitting(true);
    //   setOutput("");
    //   setError("");

    //   const res = await axios.post(
    //     `http://localhost:3000/submit/${problem.slug}`,
    //     {
    //       code,
    //       language
    //     }
    //   );

    //   console.log(res.data);
    //   setOutput(res.data);

    // } catch (err) {
    //   setError(
    //     err.response?.data?.message || "Error while executing code"
    //   );
    // } finally {
    //   setSubmitting(false);
    // }
  };


  return (
    <div className={styles.container}>
      {/* LEFT: PROBLEM */}
      <div className={styles.leftPane}>
        <ProblemPreview problem={problem} />
      </div>

      {/* RIGHT: EDITOR */}
      <div className={styles.rightPane}>
        <div className={styles.editorHeader}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={handleRun}
            disabled={running}
            className={styles.runBtn}
          >
            {running ? "Running..." : "Run"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={styles.runBtn}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

        </div>

        <Editor
          height="400px"
          language="cpp"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />

        {/* Custom Input */}
        <div className={styles.ioBox}>
          <h4 style={{ color: '#fff' }}>Custom Input</h4>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter custom input here..."
          />
        </div>

        {/* Output */}
        <div className={styles.outputBox}>
          <h4>Output</h4>
          {error ? (
            <pre className={styles.error}>{error}</pre>
          ) : (
            <pre>{output}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSolve;
