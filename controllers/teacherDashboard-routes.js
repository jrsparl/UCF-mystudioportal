const router = require("express").Router();
const { User, Student, Comment, Teacher } = require("../models");

// // get all students for teacher
// router.get("/:id", (req, res) => {
//   Student.findAll({
//     where: {
//       teacher_id: req.params.id,
//     },
//     include: [
//       {
//         model: User,
//         attributes: ["username", "first_name", "last_name"],
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
    console.log(req.session);
    res.render("teacherhome", { loggedIn: true });
  });


module.exports = router;
