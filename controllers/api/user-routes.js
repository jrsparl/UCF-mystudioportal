const router = require("express").Router();
const { User, Teacher, Student } = require("../../models");

router.get("/", (req, res) => {
  User.findAll({
    // attributes: { exclude: ["password"] },
    include: [
      {
        model: Student,
      },
      {
        model: Teacher,
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Student,
      },
      {
        model: Teacher,
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
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
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.role = dbUserData.role;
        req.session.company_id = dbUserData.company_id;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", async (req, res) => {
  try {
    const UserToUpdate = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!UserToUpdate) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    UserToUpdate.update(req.body);
    if (req.body.password) {
      UserToUpdate.hashPassword();
    }

    res.json({ status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    include: [
      {
        model: Student,
      },
      {
        model: Teacher,
      },
    ],
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.role = dbUserData.role;
      if (dbUserData.teacher) {
        req.session.teacher_id = dbUserData.teacher.id;
      }
      if (dbUserData.student) {
        req.session.student_id = dbUserData.student.id;
      }
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
