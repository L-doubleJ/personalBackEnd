var express = require('express');
var router = express.Router();
const { exec } = require('../db/mysql');
const { successModule, errorModule } = require('../resModule/resModule');


function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds());
    return Y+M+D+h+m+s;
}
function timeToTimestamp(date) {
    let d = new Date(date);
    return Date.parse(d)/1000;
}

router.get('/list', async function(req, res, next){ 
    const state = req.query.state || '';
    const keyWord = req.query.keyWord || '';
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id; 
    const data =  await exec(`select * from remeber where userid = '${id}' and title like '%${keyWord}%' and state like '%${state}%'`);
    data.map(item=>{
        item.date = timestampToTime(item.date);
    })
    res.json(successModule(data))
});

router.post('/add', async function(req, res, next){ 
    let {remark,state,date,title} = req.body;
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id;
    date = timeToTimestamp(date);
    const sql = `insert into remeber(userid,state,date,title,remark) values('${id}','${state}','${date}','${title}','${remark}')`;
    await exec(sql);
    res.json(successModule('','添加成功'));
});


router.post('/update', async function(req, res, next){ 
    let {remark,state,date,title,id} = req.body;
    date = timeToTimestamp(date);
    const sql = `update remeber set remark = '${remark}',state='${state}',date='${date}',title='${title}' where id = '${id}'`;
    await exec(sql);
    res.json(successModule('','编辑成功'));
});

router.delete('/delete', async function(req, res, next){ 
    let {id} = req.body;
    const sql = `delete from remeber where id = '${id}'`;
    await exec(sql);
    res.json(successModule('','删除成功'));
});

module.exports=router




