const router = require("express").Router();
const { Teacher, User } = require("../../models");

router.get("/", (req, res) => {
  Teacher.findAll({
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbTeacherData) => res.json(dbTeacherData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Teacher.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbTeacherData) => {
      if (!dbTeacherData) {
        res.status(404).json({ message: "No Teacher found with this id" });
        return;
      }
      res.json(dbTeacherData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Teacher.create({
    user_id: req.body.user_id,
    company_id: req.body.company_id,
    birthday: req.body.birthday,
    profilePic: req.body.profilePic,
    coachingGenre: req.body.coachingGenre,
    coachingLevel: req.body.coachingLevel,
  })
    .then((dbTeacherData) => {
      (req.session.user_id = dbTeacherData.id),
        (req.session.company_id = dbTeacherData.company_id),
        (req.session.birthday = dbTeacherData.birthday),
        (req.session.profilePic = dbTeacherData.profilePic),
        (req.session.coachingGenre = dbTeacherData.coachingGenre),
        (req.session.coachingLevel = dbTeacherData.coachingLevel),
        res.json(dbTeacherData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Teacher.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTeacherData) => {
      if (!dbTeacherData) {
        res.status(404).json({ message: "No teacher found with this id" });
        return;
      }
      res.json(dbTeacherData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
