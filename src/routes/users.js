var express = require("express");
var router = express.Router();
const { exec } = require("../db/mysql");
const { successModule, errorModule } = require("../resModule/resModule");

/* GET users listing. */
router.post("/register", async function(req, res, next) {
  const { username, password, email } = req.body;
  //看一下有没有用户
  const isData = await exec(
    `select * from users where username = '${username}'`
  );
  const isEmail = await exec(
    `select * from users where email = '${email}'`
  );
  if (isData == false) {
    if(isEmail==false){

    }else{
      res.json(errorModule("失败", "邮箱已存在"));
    }
    const token = Number(
      Math.random()
        .toString()
        .substr(3, 6) + Date.now()
    ).toString(36);
    const addSql = `INSERT into users(username,password,token,email) values('${username}','${password}','${token}','${email}')`;
    const addResult = await exec(addSql);
    if (addResult) {
      res.json(successModule("", "注册成功"));
    }
  } else {
    res.json(errorModule("失败", "账号已存在"));
  }
});

router.post("/login", async function(req, res, next) {
  const { username, password } = req.body;
  //看一下有没有用户
  const isData = await exec(
    `select * from users where username = '${username}'`
  );
  if (!(isData == false)) {
    if (password === isData[0].password) {
      res.json(successModule(isData[0], "登陆成功"));
    } else {
      res.json(errorModule("失败", "密码错误"));
    }
  } else {
    res.json(errorModule("失败", "没有此用户"));
  }
});
router.get("/userInfo", async function(req, res, next) {
  const token = req.headers.token;
  const userData = await exec(`select * from users where token = '${token}'`);
  delete userData[0].token;
  delete userData[0].password;
  res.json(errorModule(userData[0]));
});
router.post("/updateUserInfo", async function(req, res, next) {
  const token = req.headers.token;
  const { realname, email, hobbies } = req.body;
  const sql = `update users set realname= '${realname}', email='${email}',hobbies='${hobbies}' where token='${token}'`;
  const userData = await exec(sql);
  if (userData) {
    res.json(successModule());
  }
});

router.post("/resetPassword", async function(req, res, next) {
  const token = req.headers.token;
  const { oldPassword, newPassword } = req.body;
  const user = await exec(`select * from users where token = '${token}'`);
  if (oldPassword == user[0].password) {
    const sql = `update users set password= '${newPassword}' where token='${token}'`;
    await exec(sql);
    res.json(successModule("", "更换密码成功"));
  } else {
    res.json(errorModule("", "旧密码错误"));
  }
});

module.exports = router;
