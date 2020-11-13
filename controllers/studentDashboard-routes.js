const router = require("express").Router();
const { User, Student, Comment } = require("../models");



// get all comments for student
router.get("/", (req, res) => {
  Comment.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "comment_text", "createdAt"],
    include: {
      model: Comment,
      attributes: ["id", "comment_text", "user_id", "createdAt"],
      include: {
        model: User,
        attributes: ["username"],
      },
    },
  });
});
