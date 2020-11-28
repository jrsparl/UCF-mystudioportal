const router = require("express").Router();
const { User, Student } = require("../models");
const withAuth = require("../utils/auth");


// get all students for teacher
router.get("/:id", withAuth, (req, res) => {

  do {
    req.session.student_id = req.params.id
  }
  while (req.session.student_id !== req.params.id);

  res.redirect("/teacherlessonroom")

 
  
  });


router.get("/", withAuth, (req, res) => {
    Student.findOne({
        where: {
          id: req.session.student_id,
        },
    
        //  attributes: [
        //      "company_id",
        //      "id",
        //      "first_name",
        //      "last_name"
        //  ],
        include: [
          {
            model: User,
            // attributes: ["id", "birthday", "coaching_genre", "coaching_level"]
          },
         
        ],
      })
        .then((dbUserData) => {
          const student = dbUserData.get({ plain: true });
          student.current_teacher_id = req.session.user_id
          res.render("teacherlessonroom", { student, loggedIn: true });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  });


  module.exports = router;