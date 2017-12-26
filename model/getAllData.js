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

        const result = client.queryDocuments(
            collectionUrl,

            "SELECT * FROM docs"
        );
        return result; 
};
