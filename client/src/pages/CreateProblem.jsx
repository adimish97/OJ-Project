import { useState, useEffect } from "react";
import styles from "./CreateProblem.module.css";
import createProblem from "../components/api/createProblem";

const CreateProblem = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    difficulty: "easy",
    timeLimit: 1000,
    memoryLimit: 256,
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    tags: ""
  });

  const [sampleTestCases, setSampleTestCases] = useState([
    { input: "", output: "" }
  ]);

  const [testCases, setTestCases] = useState([
    { input: "", output: "" }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- AUTO SLUG ---------------- */
  useEffect(() => {
    if (!form.title) return;

    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({ ...prev, slug }));
  }, [form.title]);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  /* ---------------- TEST CASE HANDLERS ---------------- */
  const handleTestCaseChange = (index, type, field, value) => {
    const setter = type === "sample" ? setSampleTestCases : setTestCases;
    const list = type === "sample" ? sampleTestCases : testCases;

    const updated = [...list];
    updated[index][field] = value;
    setter(updated);
  };

  const addTestCase = (type) => {
    const setter = type === "sample" ? setSampleTestCases : setTestCases;
    setter((prev) => [...prev, { input: "", output: "" }]);
  };

  const removeTestCase = (index, type) => {
    const setter = type === "sample" ? setSampleTestCases : setTestCases;
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    if (!form.title || !form.slug || !form.description) {
      return "Title, slug and description are required";
    }

    if (!/^[a-z0-9-]+$/.test(form.slug)) {
      return "Slug can only contain lowercase letters, numbers and hyphens";
    }

    if (form.timeLimit <= 0 || form.memoryLimit <= 0) {
      return "Time limit and memory limit must be positive numbers";
    }

    if (testCases.length === 0) {
      return "At least one hidden test case is required";
    }

    return null;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      timeLimit: Number(form.timeLimit),
      memoryLimit: Number(form.memoryLimit),
      tags: form.tags.split(",").map(tag => tag.trim()),
      sampleTestCases,
      testCases
    };

    try {
      const data = await createProblem(payload);
      console.log("Problem created:", data);
      alert("Problem created successfully!");

      // reset form
      setForm({
        title: "",
        slug: "",
        description: "",
        difficulty: "easy",
        timeLimit: 1000,
        memoryLimit: 256,
        inputFormat: "",
        outputFormat: "",
        constraints: "",
        tags: ""
      });
      setSampleTestCases([
        { input: "", output: "" }
      ]);
      setTestCases([
        { input: "", output: "" }
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create New Problem</h2>
        <p className={styles.subtitle}>
          Fill in the details to add a new problem to the judge
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Find Largest Element in an Array"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Slug *</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="find-largest-element-in-array"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Difficulty</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className={styles.inlineGroup}>
            <div className={styles.formGroup}>
              <label>Time Limit (ms)</label>
              <input
                type="number"
                name="timeLimit"
                value={form.timeLimit}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Memory Limit (MB)</label>
              <input
                type="number"
                name="memoryLimit"
                value={form.memoryLimit}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Input Format</label>
            <textarea
              name="inputFormat"
              value={form.inputFormat}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Output Format</label>
            <textarea
              name="outputFormat"
              value={form.outputFormat}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Constraints</label>
            <textarea
              name="constraints"
              value={form.constraints}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tags (comma separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="array, math"
            />
          </div>

          {/* ---------------- SAMPLE TEST CASES ---------------- */}
          <h3 className={styles.sectionTitle}>Sample Test Cases (Visible)</h3>
          {sampleTestCases.map((tc, index) => (
            <div key={index} className={styles.testCaseBox}>
              <textarea
                placeholder="Input"
                value={tc.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "sample", "input", e.target.value)
                }
              />
              <textarea
                placeholder="Output"
                value={tc.output}
                onChange={(e) =>
                  handleTestCaseChange(index, "sample", "output", e.target.value)
                }
              />
              <button className={styles.removeBtn} onClick={() => removeTestCase(index, "sample")}>
                Remove
              </button>
            </div>
          ))}
          <button className={styles.addBtn} onClick={() => addTestCase("sample")}>
            + Add Sample Test Case
          </button>

          {/* ---------------- HIDDEN TEST CASES ---------------- */}
          <h3>Hidden Test Cases (Used for Submit)</h3>
          {testCases.map((tc, index) => (
            <div key={index} className={styles.testCaseBox}>
              <textarea
                placeholder="Input"
                value={tc.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "hidden", "input", e.target.value)
                }
              />
              <textarea
                placeholder="Expected Output"
                value={tc.output}
                onChange={(e) =>
                  handleTestCaseChange(index, "hidden", "output", e.target.value)
                }
              />
              <button className={styles.removeBtn} onClick={() => removeTestCase(index, "hidden")}>
                Remove
              </button>
            </div>
          ))}
          <button className={styles.addBtn} onClick={() => addTestCase("hidden")}>
            + Add Hidden Test Case
          </button>

        </div>

        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Problem"}
        </button>
      </div>
    </div>
  );
};

export default CreateProblem;
