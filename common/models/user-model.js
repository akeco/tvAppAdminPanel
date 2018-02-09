'use strict';
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");

const rndToken = randomstring.generate();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tvquizapp@gmail.com',
        pass: 'quizapp123'
    }
});

var mailOptions = {
    from: 'tvquizapp@gmail.com',
    to: 'amerkecho@hotmail.com',
    subject: 'Sending Email using Node.js',
    text: "http://localhost:3000/verifyemail/"+rndToken
};

module.exports = function(Usermodel) {
    Usermodel.observe('before save', function(ctx, next) {
        if (ctx.instance) {
            ctx.instance.emailToken = rndToken;
            console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id, ctx.instance.email);
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } else {
            console.log('Updated %s matching %j',
                ctx.Model.pluralModelName,
                ctx.where);
        }
        next();
    });

/*
    Usermodel.verifyemail = function(msg, cb) {
        cb(null, 'Greetings... ' + msg);
    };

    Usermodel.remoteMethod('verifyemail', {
        accepts: {arg: 'token', type: 'string'},
        returns: {arg: 'greeting', type: 'string'},
        http: {
            verb: 'get'
        }
    });
*/
};
