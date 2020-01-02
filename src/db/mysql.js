const mysql = require('mysql');

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',   //localhost表示本机地址
  user: 'root',   //这是数据库的账号
  password: 'Ljj.123456',//这是数据库的密码
  port: '3306', //端口号    你要连接别人的就要在这改 ，然后别人的要新建一个数据库名personal,然后把我的文件运行进去 这样就好了
  database: 'personal' // 数据库名
});

// 连接
con.connect();

const exec = sql => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = {
  exec
};
