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

        include: [{
            model: Company,
            attributes: ["id", "company_name"],
            include: [{
                model: User,
                where: {
                    role: "teacher"
                },
                include: [{
                    model: Teacher
                }]
            }]
        }]

    })
        .then(dbUserData => {
            const user = dbUserData.get({ plain: true });
            req.session.student_id = dbUserData.student.id;
            console.log(dbUserData.company.users)
            res.render('createstudentprofile', { user, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get Student profile
router.get("/studentprofile", withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id,
        },
        include: [{
            model: Student,
        },
        {
            model: Company,
        },
        ],
    })
        .then((dbUserData) => {
            const user = dbUserData.get({ plain: true });
            res.render("studentprofile", { user, loggedIn: true });
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
        include: [{
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
        }]

    })
        .then(dbUserData => {
            const user = dbUserData.get({ plain: true });
            res.render('editstudentprofile', { user, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


// router.get("/", withAuth, (req, res) => {
//     let id = req.session.user_id
//     console.log(id);
//     res.render("studenthome", { loggedIn: true });
//   });


// get user details for logged in person
router.get("/", (req, res) => {
    if (req.session.role === "student") {
        User.findOne({
            where: {
                id: req.session.user_id,
            },

            //attributes: ["username", "first_name", "last_name"],

            include: [{
                model: Student,

            },],
        })
            .then((dbUserData) => {
                const user = dbUserData.get({ plain: true });
                res.render("studenthome", { user, loggedIn: true });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;