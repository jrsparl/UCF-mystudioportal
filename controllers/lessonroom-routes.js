const router = require("express").Router();
const { User, Student, Teacher } = require("../models");
const withAuth = require("../utils/auth");
const teacherAuth = require("../utils/teacherAuth");

router.get("/:id", withAuth, teacherAuth, (req, res) => {
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
      // res.redirect("/teacherlessonroom");
      student.current_teacher_id = req.session.user_id;
      if (student.teacher_id === student.current_teacher_id){
        res.render("teacherlessonroom", { student, loggedIn: true });
      } else{
        res.redirect("/teacherhome")
      }
     
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/", withAuth, (req, res) => {
//   Student.findOne({
//     where: {
//       id: req.session.student_id,
//     },
//     include: [
//       {
//         model: User,
//       },
//     ],
//   })
//     .then((dbUserData) => {
//       if (dbUserData) {
//         const student = dbUserData.get({ plain: true });
//         student.current_teacher_id = req.session.user_id;
//         res.render("teacherlessonroom", { student, loggedIn: true });
//       } else {
//         res.render("teacherlessonroom", { dbUserData, loggedIn: true });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.param('student', function (req, res, next, id) {
//   Student.find(id, function (err, student) {
//     if (err) {
//       next(err)
//     } else if (student) {
//       req.student = student
//       next()
//     } else {
//       next(new Error('failed to load student'))
//     }
//   })
// })

module.exports = router;
