const router = require("express").Router();
const { User, Student } = require("../models");
const withAuth = require("../utils/auth");

// get all students for teacher
router.get("/:id", withAuth, (req, res) => {
  req.session.student_id = req.params.id;
  Student.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbStudentData) => {
      const student = dbStudentData.get({ plain: true });
      console.log(student);

      res.redirect("/teacherlessonroom");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", withAuth, (req, res) => {
  Student.findOne({
    where: {
      id: req.session.student_id,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbUserData) => {
      
      if (dbUserData) {
        const student = dbUserData.get({ plain: true });
        student.current_teacher_id = req.session.user_id;
        res.render("teacherlessonroom", { student, loggedIn: true });
      } else {
        res.render("teacherlessonroom", { dbUserData, loggedIn: true });
      }

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
