module.exports = (server, client, clientSub) => {
    "use strict";

    const io = require('socket.io')(server.start());
    const {
        createFiles,
        updateFiles,
        resetFiles,
    } = require("./createUpdateFiles");
    const createScoreResult = require('./createScoreResults');


    client.on('connect', function() {
        console.log('Connected to Redis');
    }).on('error', function () {
        console.log('Redis connection error');
    });

    clientSub.on('connect', function() {
        console.log('Connected to Redis SUB');
    }).on('error', function () {
        console.log('Redis SUB error');
    }).on('message', (channel, message) => {
        if(channel === "send-result"){
            console.info("GOT RESULTS", message);
            createScoreResult(message);
        }
    }).subscribe('send-result');

    io.sockets.on('connection', function (socket){
        console.info("connected",socket.id);

        socket.once('disconnect', function () {
            console.info("disconnected", socket.id);
            socket.disconnect();
        });

        socket.on("create-question-files", (questionSize)=>{
            createFiles(questionSize);
        });

        socket.on("reset-question-files", ()=>{
            resetFiles();
        });

        socket.on("update-question-file", (index)=>{
            updateFiles(index);
        });

        socket.on("activate", (data) => {
            console.info("ACTIVATE", data);
            const resultsToSend = JSON.parse(data);
            if(!resultsToSend.disableDevices) client.publish("receive-question", data);
        });
    });

};
