const express = require("express");
const loginRouter = express.Router();
const db = require("../../mysql/database");
const bcrypt = require('bcrypt');

const sql = "Select * from users where email = ?";

const user = {
  userName: "Proszę się zalogować",
  visits: 10,
};

loginRouter.get("/", (req, res) => {
  res.render("./pages/layout/mainPage", {
    userInfo: user,
    pageName: "Logowanie",
    pageToRender: "login",
    msg: "",
  });
});

loginRouter.post("/auth", (req, res) => {
  const user = { email: req.body.email, password: req.body.password };

  db.query(sql, [user.email], (err, data) => {
    if (err) {
      throw err;
    }
    console.log(user);
    console.log(data[0]);
    if (data.length > 0) {
      const comparison = bcrypt.compareSync(user.password,data[0].password);
      
      if(comparison){
        req.session.logged_in = true;
        req.session.userName = data[0].username;
        res.cookie("last_login", Date.now(), { maxAge: 900000 });
        res.redirect("/");
      }else{
        res.send({                 
          "code":204,                 
          "error":"Email and password does not match"            
          })
      }   
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = loginRouter;
