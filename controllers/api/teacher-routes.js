const router = require("express").Router();
const { Teacher, User, Student } = require("../../models");

router.get("/", (req, res) => {
  Teacher.findAll({
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbTeacherData) => res.json(dbTeacherData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Teacher.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
      },
      {
        model: Student,
        include: {
          model: User,
        },
      },
    ],
  })
    .then((dbTeacherData) => {
      if (!dbTeacherData) {
        res.status(404).json({ message: "No Teacher found with this id" });
        return;
      }
      res.json(dbTeacherData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all students for teacher
router.get("/students/:id", (req, res) => {
  Student.findAll({
    where: {
      teacher_id: req.session.user_id,
    },
    include: [
      {
        model: User,
       attributes: ["username", "first_name", "last_name", "email"],
      },
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Teacher.create({
    user_id: req.body.user_id,
    // company_id: req.body.company_id,
    birthday: req.body.birthday,
    profile_pic: req.body.profile_pic,
    coaching_genre: req.body.coaching_genre,
    coaching_level: req.body.coaching_level,
  })
    .then((dbTeacherData) => {
      (req.session.user_id = dbTeacherData.user_id),
      (req.session.teacher_id = dbTeacherData.id),
        // (req.session.company_id = dbTeacherData.company_id),
        // (req.session.birthday = dbTeacherData.birthday),
        // (req.session.profile_pic = dbTeacherData.profile_pic),
        // (req.session.coaching_genre = dbTeacherData.coaching_genre),
        // (req.session.coaching_level = dbTeacherData.coaching_level),
        res.json(dbTeacherData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Teacher.update(req.body, {
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbTeacherData) => {
      if (!dbTeacherData) {
        res.status(404).json({ message: "No teacher found with this id" });
        return;
      }
      res.json(dbTeacherData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/user", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    company_id: req.body.company_id,
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Teacher.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTeacherData) => {
      if (!dbTeacherData) {
        res.status(404).json({ message: "No teacher found with this id" });
        return;
      }
      res.json(dbTeacherData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
