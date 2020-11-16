const router = require("express").Router();
const { User, Student, Comment, Teacher } = require("../models");

// get all comments for student
// router.get("/", (req, res) => {
//   Comment.findAll({
//     where: {
//       student_id: req.params.id,
//     },
//     include: [
//       {
//         model: Teacher,
//         attributes: ["id"],
//         include: {
//           model: User,
//           attributes: ["username", "first_name", "last_name"],
//         },
//       },
//     ],
//   })
//     .then((dbCommentData) => res.json(dbCommentData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


router.get("/", (req, res) => {
    let id = req.session.user_id
    console.log(id);
    res.render("studenthome", { loggedIn: true });
  });


module.exports = router;
