var nodemailer  = require('nodemailer');
var config = require('../config/index');

var mailTransport = nodemailer.createTransport({
    host : config.email.host,
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    port: config.email.port,
    auth : {
        user : config.email.user,
        pass : config.email.pass
    },
});

module.exports = mailTransport;

