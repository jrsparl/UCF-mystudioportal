const { nanoid } = require("nanoid");
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", async (req, res) => {
  try {
    if (!req.files) {
      return res.json({
        status: false,
        message: "No file provided",
      });
    }
    const fileUp = req.files.fileUp;

    // generating random id for the file name
    // const id = nanoid();

    // const randomFileName = path.join(id + path.extname(fileUp.name));

    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file

    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    //await fileUp.mv(path.join(__dirname, "public/files/", randomFileName));
    await fileUp.mv("./public/files/" + fileUp.name);

    //send response
    res.json({
      status: true,
      message: "File was uploaded",
      data: {
        name: fileUp.name,
        mimetype: fileUp.mimetype,
        size: fileUp.size,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
