const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { name, emailId, password } = req.body;
  try {
    const newUser = new User({ name, emailId, password });
    await newUser.save();
    res.status(201).json(newUser); // The password field will be excluded automatically
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate email error
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, emailId: 1 });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId }).select("+password"); // Include password for comparison
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Remove the password from the response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ token, user: userResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
