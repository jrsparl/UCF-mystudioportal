const router = require("express").Router();
const { Teacher, User, Student, Repertoire } = require("../../models");

router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
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
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
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
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  Student.findAll({
    where: {
      teacher_id: req.session.teacher_id,
    },
    include: [
      {
        model: User,
        //  attributes: ["username", "first_name", "last_name", "email"],
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
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  if (req.session.role != "teacher") {
    res.json({ message: "invalid user" });
    return;
  }
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
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  if (req.session.teacher_id != req.params.id) {
    res.json({ message: "You can only update yourself" });
    return;
  }
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
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  if (!req.session.teacher_id) {
    res.json({ message: "You don't have permissions to create a user" });
    return;
  }
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

router.post("/song", (req, res) => {
  Repertoire.create({
    song_name: req.body.song_name,
    song_writer: req.body.song_writer,
    album_name: req.body.album_name,
    path: req.body.path,
    company_id: req.body.company_id,
  })
    .then((dbRepertoireData) => {
      res.json(dbRepertoireData);
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  if (req.session.teacher_id != req.params.id) {
    res.json({ message: "You can only delete yourself" });
    return;
  }
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
