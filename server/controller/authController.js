import AuthUser from "../model/authUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  // res.send('Register Page');

  const { firstname, lastname, email, password } = req.body;
  // console.log(firstname, lastname, email, password);

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await AuthUser.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await AuthUser.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(201).json({ message: "User registered successfully", newUser, token });

}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userData } = user._doc;

    return res.status(200).json({
      message: "Login successful",
      user: userData,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { register, login };