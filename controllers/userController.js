const User = require("../models/UserModel");

exports.createUser = async (req, res) => {
  const { name, emailId, password } = req.body;
  try {
    const newUser = new User({ name, emailId, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
