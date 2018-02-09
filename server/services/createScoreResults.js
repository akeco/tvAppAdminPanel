const fs = require('fs');

module.exports = (data) => {
    const resultList = data.split(",");
    var scoreResults = "";
    if(resultList.length){
        resultList.forEach((result, index)=>{
            if((index % 2 != 0 || index == 0) && index != resultList.length-1){
                scoreResults += `${result} ${resultList[index+1]}\n`;
            }
        });

        if(scoreResults){
            fs.writeFile(`${process.env.PWD}/rezultati/rezultati.txt`, scoreResults, function (err) {
                if (err) throw err;
            });
        }
    }
};