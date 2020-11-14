const router = require("express").Router();
const { Student, User, Comment } = require("../../models");

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
    }
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
    vocalPartName: req.body.vocalPartName,
    birthday: req.body.birthday,
    profilePic: req.body.profilePic,
    vocalStyle: req.body.vocalStyle,
    gradeLevel: req.body.gradeLevel,
    gender: req.body.gender,
    guardianEmail: req.body.guardianEmail,
    roomNumber: req.body.roomNumber,
  })
    .then((dbStudentData) => {
      (req.session.user_id = dbStudentData.id),
        (req.session.teacher_id = dbStudentData.teacher_id),
        (req.session.vocalPartName = dbStudentData.vocalPartName),
        (req.session.birthday = dbStudentData.birthday),
        (req.session.profilePic = dbStudentData.profilePic),
        (req.session.vocalStyle = dbStudentData.vocalStyle),
        (req.session.gradeLevel = dbStudentData.gradeLevel),
        (req.session.gender = dbStudentData.gender),
        (req.session.guardianEmail = dbStudentData.guardianEmail),
        (req.session.roomNumber = dbStudentData.roomNumber),
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
