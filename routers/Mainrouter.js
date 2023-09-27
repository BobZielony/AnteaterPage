const express = require("express");
const mainRouter = express.Router();

const registrationRouter = require("./subrouters/RegistrationRouter");
const loginRouter = require("./subrouters/LoginRouter");
const anteaterInfoPageRouter = require("./subrouters/AnteaterInfoPageRouter");

mainRouter.use("/anteater", anteaterInfoPageRouter);
mainRouter.use("/registration", registrationRouter);
mainRouter.use("/login", loginRouter);

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
mainRouter.get("/", (req, res) => {
  const user = {
    userName:
      req.session.userName == undefined
        ? "Proszę się zalogować"
        : req.session.userName,
    visitsNumber: "",
    lastLogin:
      req.cookies.last_login == undefined
        ? "Brak ostatniego logowania"
        : new Date(new Date(parseInt(req.cookies.last_login))),
  };
  let visits = req.cookies.number_of_visits;
  res.render("./pages/layout/mainPage", {
    anteaterData: anteaters,
    userInfo: user,
    numberOfVisits: visits,
    pageName: "Strona Główna",
    pageToRender: "main",
  });
});

module.exports = mainRouter;
