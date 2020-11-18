const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const fileUpload = require("express-fileupload");
const cors = require("cors");
//const bodyParser = require('body-parser');
const morgan = require("morgan");
const _ = require("lodash");

const app = express();
const PORT = process.env.PORT || 3001;

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(cors());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

app.post("/upload-avatar", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv("./public/uploads/" + avatar.name);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
