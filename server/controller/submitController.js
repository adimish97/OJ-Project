import executeCpp from "../compiler/executeCompileCpp.js"
import generateFile from "../compiler/generateFile.js";
import generateInputFile from "../compiler/generateInputFile.js";
import Problem from "../model/problem.js";
import compileCpp from "../compiler/compileCpp.js"; // new file

// const compileCode = async (language, code) => {
//   const filePath = generateFile(language, code);
//   const executablePath = await compileCpp(filePath);
//   return executablePath;
// };

// const runCode = async (language, code, input) => {
//   console.log("Running code with input:", input);
//   const filePath = generateFile(language, code);
//   const inputFilePath = generateInputFile(input);
//   const output = await executeCpp(filePath, inputFilePath);
//   return output;
// }

// const handleSubmitRequest = async (req, res) => {

//   const { code, language, slug } = req.body;

//   if (!code || !language || !slug) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   try {
//     // 🔹 Fetch problem from DB using slug
//     const problem = await Problem.findOne({ slug });

//     // console.log("Fetched problem:", problem);

//     if (!problem) {
//       return res.status(404).json({ error: "Problem not found" });
//     }

//     const hiddenTestCases = problem.testCases; // hidden ones only

//     const results = [];

//     for (let i = 0; i < hiddenTestCases.length; i++) {
//       const test = hiddenTestCases[i];
//       console.log("Running test case:", test);

//       let output = await runCode(language, code, test.input);
//       console.log('hi');

//       const passed = output.trim() === test.output.trim();

//       results.push({
//         testCase: i + 1,
//         passed
//       });

//       if (!passed) break; // stop early
//     }

//     const allPassed = results.every(r => r.passed);

//     res.json({
//       success: allPassed,
//       total: hiddenTestCases.length,
//       passed: results.filter(r => r.passed).length,
//       results
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.toString() });
//   }
// }

const handleSubmitRequest = async (req, res) => {
  const { code, language, slug } = req.body;

  if (!code || !language || !slug) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const problem = await Problem.findOne({ slug });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const hiddenTestCases = problem.testCases;

    // 🔥 COMPILE ONCE
    const filePath = generateFile(language, code);
    const executablePath = await compileCpp(filePath);

    const results = [];

    for (let i = 0; i < hiddenTestCases.length; i++) {
      const test = hiddenTestCases[i];

      const inputFilePath = generateInputFile(test.input);

      const output = await executeCpp(executablePath, inputFilePath);

      const passed = output.trim() === test.output.trim();

      results.push({
        testCase: i + 1,
        passed
      });

      if (!passed) break;
    }

    res.json({
      success: results.every(r => r.passed),
      total: hiddenTestCases.length,
      passed: results.filter(r => r.passed).length,
      results
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { handleSubmitRequest };