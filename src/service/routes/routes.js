const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const { form: userData } = req.body;
  const user = users.insertOne(userData);
  if (userData.email == "admin@tango") {
    user.isAdmin = true;
  }
  return res.status(200).json({ user });
});

router.get("/login", (req, res) => {
  const { email, password } = req.query;
  const isAuthenticated = !!users.where((obj) => {
    return obj.email == email && obj.password == password;
  }).length;
  return res.status(isAuthenticated ? 200 : 403).send(isAuthenticated);
});

router.get("/user", (req, res) => {
  const { email } = req.query;
  return res
    .status(200)
    .json(users.where((obj) => obj.email == decodeURIComponent(email))[0]);
});

router.post("/formsubmit", (req, res) => {
  io.emit("FormSubmitted", req.body);
  res.send("Event Triggered!!").status(200);
});

module.exports = router;
