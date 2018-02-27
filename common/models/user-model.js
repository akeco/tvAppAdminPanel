'use strict';
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");

const rndToken = randomstring.generate({
    length: 50
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.SEND_TO,
    subject: 'Sending Email using Node.js',
    text: "http://localhost:8086/email-validation/"+rndToken
};

module.exports = function(Usermodel) {
    Usermodel.beforeRemote('create', function(ctx, modelInstance, next) {
        if (ctx && ctx.req && ctx.req.body) {
            ctx.req.body.emailToken = rndToken;
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        next();
    });
};
