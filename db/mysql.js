var mysql = require('mysql');
var config = require('../config/index');
var pool  = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database:config.db.database, // 前面建的user表位于这个数据库中
  port: 3306
});

let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}


//  注册 查找用户是否存在
let getuser = function( value ) {
  let _sql = "SELECT * FROM user_table WHERE (username)= (?)";
  return query( _sql, value )
}

// 数据储存用户

let adduser = function( value ) {
  // let _sql = "SELECT * FROM user_table WHERE (username)= (?)";
  let _sql = "insert into user_table (username,password,inviter,active_code,create_time) values (?,?,?,?,?)";
  return query( _sql, value )
}


// 登陆
let login = function( value ) {
  let _sql = "SELECT * FROM user_table WHERE (username,password)= (?,?)";
  return query( _sql, value )
}


//激活
let getCode =  function(value){
  let _sql = `UPDATE user_table SET is_actived='1' where (active_code)= (?)`;
  return query( _sql, value )
}

//获取uid by code
let getUidByCode =  function(value){
  let _sql = `SELECT * FROM user_table WHERE (active_code)= (?)`;
  return query( _sql, value )
}

//获取用户信息
let getUserInfo =  function(value){
  let _sql = `SELECT * FROM user_info where (uid)= (?)`;
  return query( _sql, value )
}

//获取用户信息
let getBonus =  function(value){
  let _sql = `SELECT * FROM bonus where (uid)= (?)`;
  return query( _sql, value )
}

//更新用户信息
let setUserInfo =  function(value){
  let _sql = `UPDATE user_info SET email=(?),phone=(?), okex_uname=(?), eth_account=(?) where (uid)= (?)`;
  return query( _sql, value )
}

//激活
let updateIsActive = function(value){
  let _sql = `UPDATE user_table SET is_active_email_sent='1' where (id)= (?)`;
  return query( _sql, value)
}

// 添加糖果
let insertBonus = function( value ) {
  let _sql = "insert into bonus (uid,bonus_to_send,bonus_sent) values(?,?,?)";
  return query( _sql, value )
}

// 添加用户信息
let insertUserInfo = function( value ) {
  let _sql = "insert into user_info (uid,email) values(?,?)";
  return query( _sql, value )
}


module.exports={
	query,
  getuser,
  adduser,
  login,
  getCode,
  getUidByCode,
  getUserInfo,
  getBonus,
  setUserInfo,
  updateIsActive,
  insertBonus,
  insertUserInfo
}
