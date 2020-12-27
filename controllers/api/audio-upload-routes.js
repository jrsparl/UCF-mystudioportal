const router = require("express").Router();
const cloudinary = require("../../utils/cloudinary");

router.post("/", async (req, res) => {
  if (!req.session.loggedIn) {
    res.json({ message: "You must be logged in" });
    return;
  }
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  if (!req.session.teacher_id) {
    res.json({ message: "Only teachers can upload audio files!" });
    return;
  }
  try {
    if (!req.files) {
      return res.json({
        status: false,
        message: "No file provided",
      });
    }
    const fileUp = req.files.fileUp;
    console.log(fileUp);

    const result = await cloudinary.uploader.upload(fileUp.tempFilePath, {
      resource_type: "video",
      folder: "repertoire",
      fetch_format: "auto",
    });
    console.log(result);

    res.json({
      status: true,
      message: "File was uploaded",
      data: {
        name: result.secure_url,
        mimetype: fileUp.mimetype,
        size: fileUp.size,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
