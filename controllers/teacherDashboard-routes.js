const router = require("express").Router();
const { User, Student, Comment, Teacher, Company } = require("../models");
const withAuth = require("../utils/auth");

// get user details for logged in person
router.get("/", (req, res) => {

   User.findOne({
    where: {
      id: req.session.user_id,
    },
    
    attributes: [
        "username", "first_name", "last_name"
    ],

    include: [
        {
          model: Teacher,
          attributes: ['id', 'birthday', 'coaching_genre', 'coaching_level'],
        },
      ]
      
  })
  .then(dbUserData => {
    const user = dbUserData.get({plain: true});
    res.render('teacherhome', { user, loggedIn: true });
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



// get user details for logged in person
router.get("/adduser", withAuth, (req, res) => {

    User.findOne({
     where: {
       id: req.session.user_id,
     },
     
     attributes: [
         "company_id"
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
     res.render('adduser', { user, loggedIn: true });
   })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 });


 // get user details for logged in person
router.get("/createprofile", withAuth, (req, res) => {

    User.findOne({
     where: {
       id: req.session.user_id,
     },
     
     attributes: [
         "company_id, id"
     ]
       
   })
   .then(dbUserData => {
     const user = dbUserData.get({plain: true});
     res.render('createprofile', { user, loggedIn: true });
   })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 });

 // get user details for logged in person
router.get("/editprofile", withAuth, (req, res) => {

    User.findOne({
     where: {
       id: req.session.user_id,
     },
     
     attributes: [
         "company_id, id"
     ]
       
   })
   .then(dbUserData => {
     const user = dbUserData.get({plain: true});
     res.render('editprofile', { user, loggedIn: true });
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
