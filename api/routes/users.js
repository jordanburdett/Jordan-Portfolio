require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var express = require("express");
var router = express.Router();
const db = require("../db/connection");

const connectToCollection = async (collection) => {
  const usersCollection = await db.collection(collection);
  return usersCollection;
};

/* GET users listing. */
router.post("/login", async function (req, res, next) {
  const email = req?.body?.email;
  const password = req?.body?.password;
  console.log(req.body);

  if (!email || !password) {
    res.json({
      success: false, message: "email or password not provided"
    });
    return;    
  }

  // authenticate user from database
  const usersCollection = await connectToCollection("users");
  const user = await usersCollection.findOne({ email: req.body.email });

  if (!user) {
    res.json({ success: false, message: "User not found" });
    return;
  }

  // check if password matches
  const compareResult = await bcrypt.compare(req.body.password, user.password);

  if (compareResult == false) {
    res.json({ success: false, message: "Incorrect Password" });
    return;
  }

  // create json web token and return it to the client
  const accessToken = jwt.sign(
    { email: user.email, admin: user?.admin },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({
    token: accessToken,
    success: true,
    message: "User Authenticated",
  });
  console.log("finished");
});

router.post("/createuser", async (req, res, next) => {
  const email = req?.body?.email;
  const password = req?.body?.password;
  const admin = false;

  // make sure we have a username and password
  if (!email || !password) {
    res.json({
      success: false, message: "email or password not provided"
    });
    return;    
  }

  // check if email is already being used
  const usersCollection = await connectToCollection("users");
  const user = await usersCollection.findOne({ email: req.body.email });

  if (user) {
    res.json({ success: false, message: "email in use" });
    return;
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, saltRounds);
  console.log(passwordHash);

  const newUser = {
    email: email,
    password: passwordHash,
    admin: admin,
  };

  // store new user in database
  const result = await usersCollection.insertOne(newUser);

  if (!result.acknowledged) {
    res.json({ success: false, message: "User not created" });
    return;
  }

  // return access token to client
  const accessToken = jwt.sign(
    { email: newUser.email, admin: newUser?.admin },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({
    token: accessToken,
    success: true,
    message: "User Created",
  });
});

module.exports = router;
