const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ----------------------------------------------------
// These files are missing Riya... so im commenting it out...
// ----------------------------------------------------
// const Customer = require("../models/customer");
// const Admin = require("../models/admin");

const router = express.Router();

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, "username isnide login route");
  let user = await Customer.findOne({ where: { username } });
  let role = "customer";

  if (!user) {
    user = await Admin.findOne({ where: { username } });
    role = "admin";
  }
  // console.log(user, "user");
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { userId: user.customer_id || user.admin_id, role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.json({ accessToken: token, role: role });
  } else {
    res.status(401).json({ message: "Username or password is incorrect" });
  }
});
//register
router.post("/register/customer", async (req, res) => {
  try {
    const { username, email_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newCustomer = await Customer.create({
      username: username,
      email_id: email_id,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "Customer created successfully", newCustomer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering customer", error: error.message });
  }
});

// Create admin route
router.post("/create/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newAdmin = await Admin.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: error.message });
  }
});

module.exports = router;
