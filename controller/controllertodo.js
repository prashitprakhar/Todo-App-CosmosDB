'use strict';
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');    
var cookieSession = require('cookie-session');
//const cosmosdbconn = require('../model/cosmosdbconn');
const getAllData = require('../model/getAllData');
const createDocumentData = require('../model/createDocument');
//const cosmosdbqueries = cosmosdbconn();

const urlEncodedParser = bodyParser.urlencoded({extended: false});

const authObj = require("./auth").Create({
    tenant:"prashitprakharoutlook.onmicrosoft.com",
    clientId:"506c0d73-57ab-4e09-8561-670024326020",
    secret:"D1z3FuoWo3E/aSuXZ6T0ojCQ5SQRq7G3FDezEdnNp+8=",
    //redirectUri:"http://localhost:3000/getAToken"
    redirectUri:"http://localhost:3000/getAuthToken"
});

//Receiving app.js functionalities
module.exports = function(app){

    //Login Sequence
    app.get('/', function(req, res) {
    res.end('\
            <head>\
            <title>test</title>\
            </head>\
            <body>\
            <a href="./auth">Login</a>\
            </body>\
        ');
    });


    app.get('/auth', function(req, res) {
        authObj.loginIfNotAuth(req,res,function(){
            res.send("authed");
        });
    });

    app.get('/getAuthToken', function(req, res) {
        authObj.receiveToken(req,res,function(){
            res.redirect('/index');
        });
    });

    //HTTP Get Function
    app.get('/index', function(req, res){
        const allResults = getAllData.queryCollection();
        allResults.toArray((err, results) => {
            if (err) throw err;
            //console.log(results);
            res.render('index', {todoItems: results});
            
        })
    }); 

    app.post('/index', urlEncodedParser, function(req, res){
        //console.log(req.body);
        const reqBody = req.body;
       let doc = {
            "stuff" : reqBody
        };

        console.log(doc.id);

        createDocumentData.createDocument(doc)
        .then(() => {
                const allResultsReloaded = getAllData.queryCollection();
                allResultsReloaded.toArray( (err, results) => {
                if(err) throw err;
                    console.log(results);
                res.render('index', {todoItems: results});
            })
        
        
        //queryCollection()
    }).catch((error) => {
        throw error;
           // console.log("Some Error Occured");
        });
      /*   const allResultsReloaded = getAllData.queryCollection();
           allResultsReloaded.toArray( (err, results) => {
                if(err) throw err;
                //console.log(results);
                res.render('index', {todoItems: results});
            })  */

            
        });


        //const createdOutput = createDocumentData.createDocument(doc);
        
         /*   var createdNewStuff = new Promise( (resolve, reject) => { 
                
                var promiseForCreation = createDocumentData.createDocument(doc);
                if(err) reject(err);
                else resolve(result);
            })
            .then(
           // if(err) reject(err);
          //console.log(createdNewStuff());
        getAllData.queryCollection().toArray( (err, results) =>{
            if(err) throw err;
            console.log(results);
            res.render('index', {todoItems: results});
       
        })); */

};