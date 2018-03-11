'use strict';
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
const { getRandomIntInclusive } = require("../../services/functions");
require('dotenv').config();

/*
const rndToken = randomstring.generate({
    length: 50
});
*/

const rndToken = getRandomIntInclusive(1000, 9999);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

var mailOptions = {
    from: process.env.EMAIL,
    //to: process.env.SEND_TO,
    subject: 'Verifikuj QuizApp korisnika',
    //text: process.env.EMAIL_HOST+"/email-validation/"+rndToken,
    text: "Unesite sljedeći code u vašu mobilnu aplikaciju: " + rndToken,
};

module.exports = function(Usermodel) {

    Usermodel.beforeRemote('create', function(ctx, modelInstance, next) {
        if (ctx && ctx.req && ctx.req.body) {
            ctx.req.body.emailToken = rndToken;
        }
        next();
    });

    Usermodel.afterRemote('create', function (ctx, user, next) {
        mailOptions.to = user.email;
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        next();
    });
};
