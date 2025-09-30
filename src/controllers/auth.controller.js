const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodpartner.model')
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
  try {
    const { email, password } = req.body;

    // 1. find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. generate token
    const token = jwt.sign({ id: user._id }, "d151dddabc0adf1cd766ea4eebe0f0a8");

    res.cookie("token", token);
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
}

async function registerFoodPartner(req,res) {
    
    const {name , email , password} = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if(isAccountAlreadyExists){
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword
    })

    // generate token
    const token = jwt.sign({ id: foodPartner._id }, "d151dddabc0adf1cd766ea4eebe0f0a8");

    res.cookie("token", token);
    res.status(201).json({
      message: "Food partner registered successfully",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name
      }
    });
      

}

async function loginFoodPartner(req,res){
    try {
    const { email, password } = req.body;

    // 1. find user
    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. check password
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. generate token
    const token = jwt.sign({ id: foodPartner._id }, "d151dddabc0adf1cd766ea4eebe0f0a8");

    res.cookie("token", token);
    res.status(200).json({
      message: "Food Partner Loged in successful",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"Food partner logged out successfully"
    })
}

module.exports = {
     registerUser,
      loginUser,
      logoutUser ,
      registerFoodPartner,
      loginFoodPartner,
      logoutFoodPartner
    };
