var express = require('express');
var router = express.Router();
var moment = require('moment');
var dbModel = require('../db/mysql');
var config = require("../config/index");

// 响应一个JSON数据
var responseJSON = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

router.get('*', function(req, res, next) {
  // 到注册页面不跳转
  if (req.url == '/reg') {
    res.render('admin/rej', {
      title: '用户注册',
      name: req.cookies.name,
      inviter: ''
    });
    return;

  }
  // if (req.url != '/login' && !req.cookies.name) {
  //   res.redirect('/login');
  // }
  // console.log(req.cookies.name);
  next();
})

// 首页
router.get('/', function(req, res, next) {
  if (req.cookies.name) {
    let uid = req.cookies.uid || 0;
    dbModel.getUserInfo([uid]).then(results => {
        res.render('admin/index', {
          name: req.cookies.name,
          title: '首页',
          link: config.host+'/reg?inviter='+uid,
          email: results[0].email,
          phone: results[0].phone,
          okex_uname: results[0].okex_uname,
          eth_account: results[0].eth_account
        });
    })
  } else {
    res.redirect('/login');
  }

});


// 登陆
router.get('/login', function(req, res, next) {
  if (req.query.tip){
    res.render('admin/login', {
      title: 'login',
      name: req.cookies.name,
      tip: '请先去邮箱激活该账号！'
    });
  }
  res.render('admin/login', {
    title: 'login',
    name: req.cookies.name,
    tip: ''
  });
});

// 注册
router.get('/reg', function(req, res, next) {
  res.render('admin/rej', {
    title: 'register',
    name: req.cookies.name,
    inviter: req.query.inviter || ''
  });
});


//激活
router.get('/active', function(req, res, next) {
  let code = req.query.code;
  dbModel.getCode(code).then(results => {
    res.render('admin/active', {
      title: 'active',
    });
  });
});


// api

module.exports = router;
