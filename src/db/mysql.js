const mysql = require('mysql');

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ljj.123456',
  port: '3306',
  database: 'personal'
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
