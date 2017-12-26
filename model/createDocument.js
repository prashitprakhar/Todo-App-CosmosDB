'use stict';
const documentClient = require('documentdb').DocumentClient;
const config = require("../config");
const url = require('url');
const client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });
const HttpStatusCodes = { NOTFOUND: 404 };
const databaseUrl = `dbs/${config.database.id}`;
const collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;

module.exports.createDocument = function(document){

    const documentUrl = `${collectionUrl}/docs/${document.id}`;
    const completionMessage = client.readDocument(documentUrl, { partitionKey: document.district }, (err, result) => {
        if (err) {
            if (err.code == HttpStatusCodes.NOTFOUND) {
                client.createDocument(collectionUrl, document, (err, created) => {
                    if (err) return err;
                    else return created;
                });
            } else {
                return err;
            }
        } else {
            return result;
        }
    });

};