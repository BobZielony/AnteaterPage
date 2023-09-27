const express = require("express");
const session = require("express-session");
const anteaterInfoPageRouter = express.Router();

const anteaters = [
  {
    name: "Giant_Anteater",
    origin: "Brazylia",
    length: 180,
  },
  {
    name: "Silky_Anteater",
    origin: "Kolumbia",
    length: 36,
  },
  {
    name: "Northern_Tamandua",
    origin: "Panama",
    length: 102,
  },
  {
    name: "Southern_Tamandua",
    origin: "Boliwia",
    length: 34,
  },
  
];

anteaterInfoPageRouter.get("/:page", (req, res) => {
  const chosenAnteaterName = req.params.page;
  let chosenAnteater;
  anteaters.forEach((anteater) => {
    if (anteater.name == chosenAnteaterName) {
      chosenAnteater = anteater;
      chosenAnteater.imageSource = chosenAnteaterName + ".jpg";
    }
  });
  const user = {
    userName: req.session.userName,
    visitsNumber:
      req.cookies.number_of_visits != undefined
        ? req.cookies.number_of_visits[chosenAnteaterName]
        : "",
  };
  if (req.session.logged_in == true) {
    if (chosenAnteater != undefined) {
      let numberOfVisits = req.cookies.number_of_visits;
      if (numberOfVisits != undefined) {
        if (numberOfVisits[chosenAnteaterName] == undefined) {
          numberOfVisits[chosenAnteaterName] = 1;
        } else {
          numberOfVisits[chosenAnteaterName] = numberOfVisits[chosenAnteaterName] + 1;
        }
      } else {
        numberOfVisits = {};
        numberOfVisits[chosenAnteaterName] = 1;
      }
      res.cookie("number_of_visits", numberOfVisits, { maxAge: 900000 });
      res.render("./pages/layout/chosenAnteater", {
        anteater: chosenAnteater,
        userInfo: user,
        pageName: chosenAnteaterName,
      });
    } else {
      res.send("<h1>Strona nie istnieje</h1>");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = anteaterInfoPageRouter;
