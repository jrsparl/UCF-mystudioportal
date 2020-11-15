const router = require("express").Router();
const { User, Student, Comment, Teacher } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("dashboard", { loggedIn: true });
});


module.exports = router;