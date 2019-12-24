var express = require('express');
var router = express.Router();
const { exec } = require('../db/mysql');
const { successModule, errorModule } = require('../resModule/resModule');

router.get('/list', async function(req, res, next){ 
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id; 
    const data =  await exec(`select * from relation where userid = '${id}'`);
    res.json(successModule(data))
});


router.post('/add', async function(req, res, next){ 
    let {remark,relation,phone,name} = req.body;
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id; 
    const sql = `insert into relation(userid,phone,name,remark,relation) values('${id}','${phone}','${name}','${remark}','${relation}')`;
    await exec(sql);
    res.json(successModule('','添加成功'));
});

router.post('/update', async function(req, res, next){ 
    let {id,remark,relation,phone,name} = req.body;
    const sql = `update relation set remark = '${remark}',relation='${relation}',phone='${phone}',name='${name}' where id = '${id}'`;
    await exec(sql);
    res.json(successModule('','编辑成功'));
});

router.delete('/delete', async function(req, res, next){ 
    let {id} = req.body;
    const sql = `delete from relation where id = '${id}'`;
    await exec(sql);
    res.json(successModule('','删除成功'));
});



module.exports = router