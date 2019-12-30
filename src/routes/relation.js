var express = require('express');
var router = express.Router();
const { exec } = require('../db/mysql');
const { successModule, errorModule } = require('../resModule/resModule');

router.get('/list', async function(req, res, next){ 
    const keyWord = req.query.keyWord || '';
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id; 
    const data =  await exec(`select * from relation where userid = '${id}' and (realname like '%${keyWord}%' or name like '%${keyWord}%')`);
    res.json(successModule(data))
});


router.post('/add', async function(req, res, next){ 
    let {remark,relation,phone,name,realname} = req.body;
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id; 
    const sql = `insert into relation(userid,phone,name,remark,relation,realname) values('${id}','${phone}','${name}','${remark}','${relation}','${realname}')`;
    await exec(sql);
    res.json(successModule('','添加成功'));
});

router.post('/update', async function(req, res, next){ 
    let {id,remark,relation,phone,name,realname} = req.body;
    const sql = `update relation set remark = '${remark}',relation='${relation}',phone='${phone}',name='${name}',realname='${realname}' where id = '${id}'`;
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