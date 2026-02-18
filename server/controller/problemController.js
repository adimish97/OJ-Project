import Problem from "../model/problem.js";

const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({})
      .select("-testCases"); // hide hidden test cases in list view

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createProblem = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      difficulty,
      timeLimit,
      memoryLimit,
      inputFormat,
      outputFormat,
      constraints,
      tags,
      sampleTestCases,
      testCases
    } = req.body;

    // 🔍 Basic validation
    if (!title || !slug || !description || !difficulty) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    if (!testCases || testCases.length === 0) {
      return res.status(400).json({
        message: "At least one hidden test case is required"
      });
    }

    const existingProblem = await Problem.findOne({ slug });
    if (existingProblem) {
      return res.status(400).json({
        message: "Problem with this slug already exists"
      });
    }

    const problem = await Problem.create({
      title,
      slug,
      description,
      difficulty,
      timeLimit,
      memoryLimit,
      inputFormat,
      outputFormat,
      constraints,
      tags,
      sampleTestCases: sampleTestCases || [],
      testCases,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // ❗ Hide hidden test cases when returning to frontend
    const problem = await Problem.findOne({ slug })
      .select("-testCases");

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found"
      });
    }

    res.status(200).json({
      success: true,
      data: problem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export { getProblems, createProblem, getProblemBySlug };
