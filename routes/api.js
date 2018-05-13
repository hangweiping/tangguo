var express = require('express');
var router = express.Router();
var moment = require('moment');
var dbModel = require('../db/mysql');
var mailTransport = require("../service/email");
var UUID = require('uuid-js');
var moment = require('moment');
var request = require('request');
var config = require('../config/index');

/* GET users listing. */


//  注册

router.post('/adduser', function(req, res) {

  let username = req.body.username;
  let password = req.body.password;
  let inviter = req.body.inviter;  

  if (username == '' || password == '') {
    res.json({
      'msg': '账号密码不能为空',
      code: 300
    });
    return;
  }
  // console.log(req.body);
  // 从数据库中查找是否有这个账户
  dbModel.getuser([`${username}`]).then(results => {
    if (results.length > 0) {
      res.json({
        'msg': '此用户已注册快去登入吧',
        'code': '100'
      })
    } else {
      let active_code = UUID.create().toString();
      let create_time = moment().format("YYYY-MM-DD HH:mm:ss");
      dbModel.adduser([`${username}`, `${password}`,`${inviter}`,`${active_code}`,`${create_time}`]).then(results => {
        if (results.insertId > 0) {
          request(config.host+'/api/send_email?to='+username+'&url='+config.host+"/active?code="+active_code);
          res.json({
            'msg': '注册成功快去登录吧',
            'code': '200'
          });
        } else {
          res.json(results);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  })

})

// 登陆

router.post('/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username == '' || password == '') {
    res.json({
      'msg': '账号密码不能为空',
      code: 300
    });
    return;
  }

  dbModel.login([`${username}`, `${password}`]).then(results => {
    if (results.length > 0) {
      if (results[0].is_actived !== '1'){
        res.json({
          'msg': 'not_is_actived, to active',
          'code': '102'
        })
      }
      res.cookie('name',username);
      res.cookie('uid',results[0].id);
      res.json({
        'msg': '登陆成功',
        'code': '200'
      })
    } else {
      res.json({
        'msg': '账号密码错误',
        'code': '100'
      })
    }
  })
})
//  退出
router.get('/exit', function(req, res) {
    res.clearCookie('name');
    // res.send({code:'000000'})
    res.redirect('/login');
});

router.post('/post',function(req,res){
  let username = req.body.username;
  let content  = req.body.content;
  let date = moment().format('YYYY-MM-DD HH:mm:ss');


// return;
  dbModel.insertPost([`${username}`,`${content}`,`${date}`]).then(results=>{

    if(results.insertId>0){
      res.json({'msg':'留言成功',code:200})
    }else{
      res.json({'msg':'留言失败稍后再试',code:100})
    }
  })
})

router.get("/send_email", function(req, res){
  var options = {
    from            : '"hangweiping@126.com',
    to              : req.query.to,
    subject         : '糖果注册激活',
    text            : '',
    html            : '<center><h1>你好，这是一封来自糖果的激活邮件！点击它！！！</h1></center><br><center>'+ '<a href="'+req.query.url+'">'+req.query.url+'</a>' +'</center>'
};

mailTransport.sendMail(options, function(err, msg){
    if(err){
        console.log(err);
        res.render('index', { title: err });
    }
    else {
        console.log(msg);
        res.render('index', { title: "已接收："+msg.accepted});
    }
});
});

//  setuserinfo
router.get('/setuserinfo', function(req, res) {
  if (req.cookies.name) {
    let uid = req.cookies.uid || 0;
    let email = req.query.email;
    let phone = req.query.phone;
    let okex_uname = req.query.okex_uname;
    let eth_account = req.query.eth_account;
    dbModel.setUserInfo([email, phone, okex_uname, eth_account, uid]).then(results => {
      res.json({
        'msg':'update info success!',
        code:200
      });
    })
  }
});

module.exports = router;
