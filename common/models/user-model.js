'use strict';
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");

const rndToken = randomstring.generate();
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
    text: "http://localhost:3000/verifyemail/"+rndToken
};

module.exports = function(Usermodel) {
    Usermodel.observe('before save', function(ctx, next) {
        if (ctx.instance) {
            ctx.instance.emailToken = rndToken;
            console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id, ctx.instance.email);
            /*
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            */
        } else {
            console.log('Updated %s matching %j',
                ctx.Model.pluralModelName,
                ctx.where);
        }
        next();
    });
};
