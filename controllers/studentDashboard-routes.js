const router = require("express").Router();
const { User, Student, Comment, Teacher, Company } = require("../models");
const withAuth = require("../utils/auth");

 // get user details for logged in person
 router.get("/createstudentprofile", withAuth, (req, res) => {

    User.findOne({
     where: {
       id: req.session.user_id,
     },
     
     attributes: [
        "id",
        "first_name",
        "last_name"
    ],

     include: [
        {
            model: Company,
            attributes: ["id", "company_name"] 
        }
     ]
       
   })
   .then(dbUserData => {
     const user = dbUserData.get({plain: true});
     res.render('createstudentprofile', { user, loggedIn: true });
   })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 });

 // get user details for logged in person
router.get("/editstudentprofile", withAuth, (req, res) => {

    User.findOne({
     where: {
       id: req.session.user_id,
     },
     
     attributes: [
         "company_id", 
         "id",
         "first_name",
         "last_name"
     ],
     include: [
        {
            model: Student,
            attributes: [
                "id", 
                "teacher_id", 
                "vocal_part_name", 
                "birthday", 
                "vocal_style", 
                "grade_level", 
                "gender",
                "room_number"
            ] 
        }
     ]
       
   })
   .then(dbUserData => {
     const user = dbUserData.get({plain: true});
     res.render('editstudentprofile', { user, loggedIn: true });
   })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 });


router.get("/", (req, res) => {
    let id = req.session.user_id
    console.log(id);
    res.render("studenthome", { loggedIn: true });
  });


module.exports = router;
