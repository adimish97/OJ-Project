import Problem from "../model/problem.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

const getProblems = async (req, res) => {
  try {
    // Fetch problems from the database
    const problems = await Problem.find({}); // Assuming Problem is a Mongoose model
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createProblem = async (req, res) => {
  // res.send('Register Page');

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
      tags
    } = req.body;

    const existingProblem = await Problem.findOne({ slug });
    if (existingProblem) {
      return res.status(400).json({ message: "Problem with this slug already exists" });
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
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Problem created successfully",
      problem
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const problem = await Problem.findOne({ slug });

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