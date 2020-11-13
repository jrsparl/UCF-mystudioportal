const router = require("express").Router();
const { Company, User } = require("../../models");

router.get("/", (req, res) => {
  Company.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbCompanyData) => res.json(dbCompanyData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Company.findOne({
    attributes: { exclude: ["password"] },
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
  Company.create({
    company_name: req.body.company_name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
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
        req.session.zipCode = dbCompanyData.zipCode;
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
