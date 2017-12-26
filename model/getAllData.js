'use stict';
const documentClient = require('documentdb').DocumentClient;
const config = require("../config");
const url = require('url');
const client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });
var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;
module.exports.queryCollection = function () { 
    //console.log(msg);
    console.log("Hello from Get All Data");

//client.


//    return new Promise((resolve, reject) => {
        const result = client.queryDocuments(
            collectionUrl,
            //"SELECT * FROM docs d WHERE d.id = 'item1'"
            "SELECT * FROM docs"
        );
      /*  .toArray((err, results) => {
            if (err) throw err;
            else {
                for (var queryResult of results) {
                    //let resultString = JSON.stringify(queryResult);
                    var resultString = JSON.stringify(queryResult);
                    //console.log(`\tQuery returned ${resultString}`);
                }
               // console.log(resultString);
                return resultString;
                //resolve(results);
            }

        }); */
        //console.log(result);
        //console.log("Results : "+results);
        
        return result;
//    }); 
};
/*
module.exports = function queryingCollection(err, result){
    if(err) throw error;
    queryCollection()
    .then(() => { exit(`Completed successfully`); })
    .catch((error) => { exit(`Completed with error ${JSON.stringify(error)}`) });
};
*/
//Querying the Database
//module.exports = /*function queryCollection() {
 /*   console.log("Hello from getalldata");
    
console.log(`Querying collection through index:\n${config.collection.id}`);
*/
 /*   promiseResult : new Promise((resolve, reject) => {
        client.queryDocuments(
            collectionUrl,
            //"SELECT * FROM docs d WHERE d.id = 'item1'"
            "SELECT * FROM docs"
        ).toArray((err, results) => {
            if (err) reject(err)
            else {
                for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }
                console.log(results);
                resolve(results);
            }
        });
    }); 
};
/*
function exit(message) {
    console.log(message);
    console.log('Press any key to exit');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
};

queryingCollection = */