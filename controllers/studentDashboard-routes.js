const router = require("express").Router();
const { User, Student, Comment, Teacher } = require("../models");



// get all comments for student
router.get("/:id", (req, res) => {
    Comment.findAll({
            where: {
                student_id: req.params.id
            },
            include: [{
                model: Teacher,
                attributes: ["id"],
                include: {
                    model: User,
                    attributes: ["username", "first_name", "last_name"]
                },
            }, ],
        })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;