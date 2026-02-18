import styles from "./ProblemPreview.module.css";

const ProblemPreview = ({ problem }) => {
  if (!problem) {
    return <p className={styles.empty}>No problem data to preview</p>;
  }

  const difficultyClass =
    styles[problem.difficulty?.toLowerCase()] || styles.easy;

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{problem.title}</h1>
          <span className={`${styles.badge} ${difficultyClass}`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Meta Info */}
        <div className={styles.meta}>
          <span>⏱ {problem.timeLimit} ms</span>
          <span>💾 {problem.memoryLimit} MB</span>
          <span className={styles.slug}>🔗 {problem.slug}</span>
        </div>

        {/* Description */}
        <Section title="Description">
          <p className={styles.text}>
            {problem.description?.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </Section>

        {/* Input Format */}
        <Section title="Input Format">
          <pre className={styles.codeBlock}>{problem.inputFormat}</pre>
        </Section>

        {/* Output Format */}
        <Section title="Output Format">
          <pre className={styles.codeBlock}>{problem.outputFormat}</pre>
        </Section>

        {/* Constraints */}
        <Section title="Constraints">
          <pre className={styles.codeBlock}>{problem.constraints}</pre>
        </Section>

        {/* Sample Test Cases */}
        {problem.sampleTestCases?.length > 0 && (
          <Section title="Sample Test Cases">
            {problem.sampleTestCases.map((test, index) => (
              <div key={index} className={styles.testCase}>
                <h4>Example {index + 1}</h4>
                <div className={styles.testBox}>
                  <strong>Input:</strong>
                  <pre>{test.input}</pre>
                </div>
                <div className={styles.testBox}>
                  <strong>Output:</strong>
                  <pre>{test.output}</pre>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Tags */}
        {problem.tags?.length > 0 && (
          <div className={styles.tags}>
            {problem.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

export default ProblemPreview;
