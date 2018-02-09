const fs = require('fs');

exports.createFiles = (questionSize) => {
    for(var i = 1; i<= questionSize; i++){
        fs.writeFile(`${process.env.PWD}/pitanja/pitanje${i}.txt`, '0', function (err) {
            if (err) throw err;
        });
    }
};

exports.updateFiles = (index) => {
    fs.readdir(`${process.env.PWD}/pitanja`, function(err, items) {
        console.log(items);

        for (var i=1; i<=items.length; i++) {
            const data = (i == index) ? 1 : 0;
            fs.writeFile(`${process.env.PWD}/pitanja/pitanje${i}.txt`, data, function (err) {
                if (err) throw err;
            });
        }
    });
};

exports.resetFiles = () => {
    fs.readdir(`${process.env.PWD}/pitanja`, function(err, items) {

        for (var i=1; i<=items.length; i++) {
            fs.writeFile(`${process.env.PWD}/pitanja/pitanje${i}.txt`, '0', function (err) {
                if (err) throw err;
            });
        }
    });
};