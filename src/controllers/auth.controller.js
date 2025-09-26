const userModel = require('../models/user.model')
const bcrypt =  require('bcrypt')
const jwt =  require('jsonwebtoken')


async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // check user already exists
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create user
    const createUser = await userModel.create({
      fullName,
      email,
      password: hash
    });

    // generate token
    const token = jwt.sign({ id: createUser._id }, "d151dddabc0adf1cd766ea4eebe0f0a8");

    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: createUser._id,
        email: createUser.email,
        fullName: createUser.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function loginUser(req, res) {
  // abhi likhna baaki hai
}

module.exports = { registerUser, loginUser };
