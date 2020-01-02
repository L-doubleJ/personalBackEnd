var express = require('express');
var router = express.Router();
const { exec } = require('../db/mysql');
const { successModule, errorModule } = require('../resModule/resModule');
//时间戳 转换日期
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D;
}
// 转化为时间戳
function timeToTimestamp(date) {
    var d = new Date(date)
    return d.getTime() / 1000;
}


router.get('/list', async function(req, res, next){ 
    const keyWord = req.query.keyWord || '';
    const state = req.query.state || '';
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    const id = user[0].id; 
    const data =  await exec(`select * from expenses  where userid = '${id}' and title like '%${keyWord}%' and state like '%${state}%'`);
    data.map(item=>{
        item.date = timestampToTime(item.date);
    })
    res.json(successModule(data))
});
router.post('/add', async function(req, res, next){     
    let {remark,state,date,title,money} = req.body;
    const token = req.headers.token;
    const user =await exec(`select * from users where token = '${token}'`);
    date = timeToTimestamp(date)
    const id = user[0].id;
    const sql = `insert into expenses(userid,state,date,money,title,remark) values('${id}','${state}','${date}','${money}','${title}','${remark}')`;
     await exec(sql);
    res.json(successModule('','添加成功'));
});

router.post('/update', async function(req, res, next){
    let {remark,state,date,title,money,id} = req.body;
    date = timeToTimestamp(date);
    const sql = `update expenses set remark = '${remark}',state='${state}',date='${date}',title='${title}',money = '${money}' where id = '${id}'`;
     await exec(sql);
    res.json(successModule('','编辑成功'));
});


router.delete('/delete', async function(req, res, next){
     const id = req.body.id;
    const sql = `delete from expenses where id = '${id}'`;
     await exec(sql);
    res.json(successModule('','删除成功'));
});

module.exports = router;