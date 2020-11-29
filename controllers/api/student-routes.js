const router = require("express").Router();
const { nanoid } = require("nanoid");
const { Student, User, Comment, Teacher } = require("../../models");

router.get("/", (req, res) => {
  Student.findAll({
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbStudentData) => res.json(dbStudentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Student.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
      },
      {
        model: Teacher,
        include: {
          model: User,
          attributes: ["username", "first_name", "last_name"]
        },
      },
    ],
  })
    .then((dbStudentData) => {
      if (!dbStudentData) {
        res.status(404).json({ message: "No Student found with this id" });
        return;
      }
      res.json(dbStudentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/comments/:id", (req, res) => {
  Comment.findAll({
    where: {
      student_id: req.params.id
    },
    include: [
      {
        model: Teacher,
        attributes: ["id"],
        include: {
          model: User,
          attributes: ["username", "first_name", "last_name"]
        },
      },
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Student.create({
    user_id: req.body.user_id,
    teacher_id: req.body.teacher_id,
    vocal_part_name: req.body.vocal_part_name,
    birthday: req.body.birthday,
    profile_pic: req.body.profile_pic,
    vocal_style: req.body.vocal_style,
    grade_level: req.body.grade_level,
    gender: req.body.gender,
    guardian_email: req.body.guardian_email,
    room_number: nanoid(),
  })
    .then((dbStudentData) => {
      (req.session.user_id = dbStudentData.user_id),
        // (req.session.teacher_id = dbStudentData.teacher_id),
        // (req.session.vocal_part_name = dbStudentData.vocal_part_name),
        // (req.session.birthday = dbStudentData.birthday),
        // (req.session.profile_pic = dbStudentData.profile_pic),
        // (req.session.vocal_style = dbStudentData.vocal_style),
        // (req.session.grade_level = dbStudentData.grade_level),
        // (req.session.gender = dbStudentData.gender),
        // (req.session.guardian_email = dbStudentData.guardian_email),
        // (req.session.room_number = dbStudentData.room_number),
        res.json(dbStudentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Student.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbStudentData) => {
      if (!dbStudentData) {
        res.status(404).json({ message: "No student found with this id" });
        return;
      }
      res.json(dbStudentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Student.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbStudentData) => {
      if (!dbStudentData) {
        res.status(404).json({ message: "No student found with this id" });
        return;
      }
      res.json(dbStudentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
