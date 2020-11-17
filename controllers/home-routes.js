const router = require("express").Router();
const {} = require("../models");

router.get("/", (req, res) => {
  if (req.session.role === "teacher") {
    res.redirect("teacherhome");
  } else if (req.session.role === "student") {
    res.redirect("studenthome");
  } else {
    res.render("homepage");
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
