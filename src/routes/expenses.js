var express = require('express');
var router = express.Router();
const { exec } = require('../db/mysql');
const { successModule, errorModule } = require('../resModule/resModule');

router.get('/list', async function(req, res, next){ 
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id; 
    const data =  await exec(`select * from expenses where userid = '${id}'`);
    res.json(successModule(data))
});
router.post('/add', async function(req, res, next){ 
    let {remark,state,date,title,money} = req.body;
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    date = date/1000;
    const id = user[0].id;
    const sql = `insert into expenses(userid,state,date,money,title,remark) values('${id}','${state}','${date}','${money}','${title}','${remark}')`;
     await exec(sql);
    res.json(successModule('','添加成功'));
});

router.post('/update', async function(req, res, next){ 
    let {remark,state,date,title,money,id} = req.body;
    date = date/1000;
    const sql = `update expenses set remark = '${remark}',state='${state}',date='${date}',title='${title}',money = '${money}' where id = '${id}'`;
     await exec(sql);
    res.json(successModule('','编辑成功'));
});

module.exports = router;