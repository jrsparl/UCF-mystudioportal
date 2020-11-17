const router = require("express").Router();
const { User, Student, Comment, Teacher, Company } = require("../models");
const withAuth = require("../utils/auth");

// get user details for logged in person
router.get("/", (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },

    attributes: ["username", "first_name", "last_name"],

    include: [
      {
        model: Teacher,
        attributes: ["id", "birthday", "coaching_genre", "coaching_level"],
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
      res.render("teacherprofile", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all students for teacher
router.get("/:id", (req, res) => {
  Student.findAll({
    where: {
      teacher_id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ["username", "first_name", "last_name"],
      },
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/", (req, res) => {
//     res.render("teacherhome", { loggedIn: true });
//   });

module.exports = router;
