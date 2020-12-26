const router = require("express").Router();
const { Company, User } = require("../../models");

router.get("/", (req, res) => {
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  Company.findAll({})
    .then((dbCompanyData) => res.json(dbCompanyData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  Company.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCompanyData) => {
      if (!dbCompanyData) {
        res.status(404).json({ message: "No Company found with this id" });
        return;
      }
      res.json(dbCompanyData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  Company.create({
    company_name: req.body.company_name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbCompanyData) => {
      req.session.save(() => {
        req.session.company_id = dbCompanyData.id;
        req.session.company_name = dbCompanyData.company_name;
        req.session.street_address = dbCompanyData.street_address;
        req.session.city = dbCompanyData.city;
        req.session.state = dbCompanyData.state;
        req.session.zip_code = dbCompanyData.zip_code;
        req.session.username = dbCompanyData.username;
        req.session.loggedIn = true;

        res.json(dbCompanyData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  if (!req.session.user_id) {
    res.json({ message: "invalid user" });
    return;
  }
  Company.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCompanyData) => {
      if (!dbCompanyData) {
        res.status(404).json({ message: "No company found with this id" });
        return;
      }
      res.json(dbCompanyData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
