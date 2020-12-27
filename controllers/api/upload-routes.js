const router = require("express").Router();
const { nanoid } = require("nanoid");
const path = require("path");
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
      folder: "profile-pic",
      fetch_format: "auto",
      transformation: [
        {
          width: 300,
          height: 300,
          crop: "fill",
          gravity: "face",
        },
      ],
    });
    console.log(result);

    // generating random id for the file name
    // const id = nanoid();

    // const randomFileName = path.join(id + path.extname(fileUp.name));

    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file

    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    //await fileUp.mv(path.join(__dirname, "../../","public/files/", randomFileName));
    //await fileUp.mv("./public/files/" + fileUp.name);

    //send response
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
