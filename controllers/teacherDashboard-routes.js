const router = require("express").Router();
const { User, Student, Comment, Teacher, Company } = require("../models");
const withAuth = require("../utils/auth");

// get user details for logged in person
router.get("/", (req, res) => {
  req.session.student_id = "";
  if (req.session.role === "teacher") {
    User.findOne({
      where: {
        id: req.session.user_id,
      },

      //attributes: ["username", "first_name", "last_name"],

      include: [
        {
          model: Teacher,
          attributes: [
            "id",
            "birthday",
            "coaching_genre",
            "coaching_level",
            "profile_pic",
          ],
        },
      ],
    })
      .then((dbUserData) => {
        const user = dbUserData.get({ plain: true });
        res.render("teacherhome", { user, loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.redirect("/login");
  }
});

// add user
router.get("/adduser", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },

    attributes: ["company_id"],

    include: [
      {
        model: Company,
        attributes: ["id", "company_name"],
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      res.render("adduser", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create teacher profile
router.get("/createteacherprofile", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },

    attributes: ["id", "first_name", "last_name"],

    include: [
      {
        model: Company,
        attributes: ["id", "company_name"],
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      res.render("createteacherprofile", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// edit teacher profile
router.get("/editteacherprofile", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },

    //  attributes: [
    //      "company_id",
    //      "id",
    //      "first_name",
    //      "last_name"
    //  ],
    include: [
      {
        model: Teacher,
        // attributes: ["id", "birthday", "coaching_genre", "coaching_level"]
      },
      {
        model: Company,
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      res.render("editteacherprofile", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/teacherprofile", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },

    include: [
      {
        model: Teacher,
      },
      {
        model: Company,
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      res.render("teacherprofile", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/userprofile", withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Teacher,
      },
      {
        model: Company,
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      res.render("userprofile", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edituserprofile", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Teacher,
      },
      {
        model: Company,
      },
    ],
  })
    .then((dbUserData) => {
      const user = dbUserData.get({ plain: true });
      res.render("edituserprofile", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
