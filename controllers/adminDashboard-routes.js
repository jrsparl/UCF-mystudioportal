const router = require("express").Router();
const { User, Student, Comment, Teacher, Company } = require("../models");
const withAuth = require("../utils/auth");

// **** admin create user function will not work right now because of security in User post route

// get user details for logged in person
router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  if (req.session.role === "admin") {
    User.findOne({
      where: {
        id: req.session.user_id,
      },
      //   attributes: ["company_id"],

      include: [
        {
          model: Company,
        },
      ],
    })
      .then((dbUserData) => {
        const user = dbUserData.get({ plain: true });
        res.render("adminhome", { user, loggedIn: true });
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
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
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

// get all Users for a Company
router.get("/:id", (req, res) => {
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  if (req.session.role != "admin") {
    res.json({ message: "Only Administrators can see all users" });
    return;
  }
  if (!(req.session.company_id === req.params.company_id)) {
    res.json({ message: "You can only see Users for your company!" });
    return;
  }
  Company.findOne({
    where: {
      id: req.params.id,
    },
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        include: [
          {
            model: Teacher,
          },
          {
            model: Student,
          },
        ],
      },
    ],
  })
    .then((dbCompanyData) => {
      if (!dbCompanyData) {
        res.status(404).json({ message: "No Company found with this id" });
        return;
      }
      res.json(dbCompanyData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// // create teacher profile
// router.get("/createteacherprofile", withAuth, (req, res) => {
//   User.findOne({
//     where: {
//       id: req.session.user_id,
//     },

//     attributes: ["id", "first_name", "last_name"],

//     include: [
//       {
//         model: Company,
//         attributes: ["id", "company_name"],
//       },
//     ],
//   })
//     .then((dbUserData) => {
//       const user = dbUserData.get({ plain: true });
//       res.render("createteacherprofile", { user, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // edit teacher profile
// router.get("/editteacherprofile", withAuth, (req, res) => {
//   User.findOne({
//     where: {
//       id: req.session.user_id,
//     },

//     include: [
//       {
//         model: Teacher,
//         // attributes: ["id", "birthday", "coaching_genre", "coaching_level"]
//       },
//       {
//         model: Company,
//       },
//     ],
//   })
//     .then((dbUserData) => {
//       const user = dbUserData.get({ plain: true });
//       res.render("editteacherprofile", { user, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// find one teacher
router.get("/:id", withAuth, (req, res) => {
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  User.findOne({
    where: {
      company_id: req.session.company_id,
      id: req.params.user_id,
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

// router.get("/", (req, res) => {
//     res.render("teacherhome", { loggedIn: true });
//   });

module.exports = router;
