const express = require("express");
const registrationRouter = express.Router();
const db = require("../../mysql/database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const sql = "SELECT * FROM users WHERE username = ?";

const userInfo = {
  userName: "Proszę się zalogować",
  visits: 10,
};

registrationRouter.get("/", (req, res) => {
  res.render("./pages/layout/mainPage", {
    userInfo: userInfo,
    pageName: "Rejestracja",
    pageToRender: "register",
    msg: "",
  });
});

registrationRouter.post("/auth", (req, res, next) => {
  let encryptedPassword = bcrypt.hashSync(req.body.password,saltRounds);
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
  };
  db.query(sql, [user.username], (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      let message = "Użytkownik już istnieje";
      res.redirect(409,'/registration');
    } else {
      const sql =
        "INSERT INTO users(id,username,password,email) values (0,?,?,?)";
      db.query(sql, [user.username, user.password, user.email], (err, data) => {
        if (err) throw err;
        res.redirect('/login')
      });
    }
  });
});

module.exports = registrationRouter;
