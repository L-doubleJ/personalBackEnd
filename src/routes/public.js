var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const { exec } = require("../db/mysql");
var smtpTransport = require("nodemailer-smtp-transport");

const { successModule, errorModule } = require("../resModule/resModule");

smtpTransport = nodemailer.createTransport(
  smtpTransport({
    service: "QQ",
    auth: {
      user: "792972988@qq.com",
      pass: "osggpufcylbibbaj"
    }
  })
);

router.post("/sendEmail", async function(req, res, next) {
  const username = req.body.username;
  const result = await exec(`select * from users where username = '${username}'`);
  const user = result[0];

  smtpTransport.sendMail(
    {
      from: "792972988@qq.com",
      to: user.email,
      subject: "找回密码",
      html: "你的密码是：" + user.password
    },
    function(error, response) {
      if (error) {
        res.json(errorModule("", "发送失败"));
        console.log("失败");
      } else {
        res.json(successModule("", "发送成功"));
        console.log("成功");
      }
    }
  );
});

module.exports = router;
