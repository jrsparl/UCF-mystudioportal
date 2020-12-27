const router = require("express").Router();
const { Company, Repertoire } = require("../../models");

router.get("/", (req, res) => {
  Repertoire.findAll({
    include: {
      model: Company,
    },
  })
    .then((dbRepertoireData) => res.json(dbRepertoireData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  Repertoire.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Company,
    },
  })
    .then((dbRepertoireData) => {
      if (!dbRepertoireData) {
        res.status(404).json({ message: "No song found with this id" });
        return;
      }
      res.json(dbRepertoireData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Repertoire.create({
    song_name: req.body.song_name,
    song_writer: req.body.song_writer,
    album_name: req.body.album_name,
    path: req.body.path,
  })
    .then((dbRepertoireData) => res.json(dbRepertoireData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Repertoire.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbRepertoireData) => {
      if (!dbRepertoireData) {
        res.status(404).json({ message: "No song found with this id!" });
        return;
      }
      res.json(dbRepertoireData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
