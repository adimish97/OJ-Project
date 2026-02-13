import styles from "./ProblemPreview.module.css";

const ProblemPreview = ({ problem }) => {
  if (!problem) {
    return <p className={styles.empty}>No problem data to preview</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{problem.title}</h1>
          <span className={`${styles.badge} ${styles[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Meta */}
        <div className={styles.meta}>
          <span>⏱ {problem.timeLimit} ms</span>
          <span>💾 {problem.memoryLimit} MB</span>
          <span>🔗 {problem.slug}</span>
        </div>

        {/* Sections */}
        <Section title="Description">
          <p>{problem.description}</p>
        </Section>

        <Section title="Input Format">
          <pre>{problem.inputFormat}</pre>
        </Section>

        <Section title="Output Format">
          <pre>{problem.outputFormat}</pre>
        </Section>

        <Section title="Constraints">
          <pre>{problem.constraints}</pre>
        </Section>

        {/* Tags */}
        <div className={styles.tags}>
          {problem.tags?.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className={styles.section}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default ProblemPreview;
