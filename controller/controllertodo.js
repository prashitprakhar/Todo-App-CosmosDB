'use strict';
const bodyParser = require('body-parser');
//const cosmosdbconn = require('../model/cosmosdbconn');
const getAllData = require('../model/getAllData');
const createDocumentData = require('../model/createDocument');
//const cosmosdbqueries = cosmosdbconn();

const urlEncodedParser = bodyParser.urlencoded({extended: false});
//Receiving app.js functionalities
module.exports = function(app){
    //HTTP Get Function
    app.get('/', function(req, res){
        const allResults = getAllData.queryCollection();
        allResults.toArray((err, results) => {
            if (err) throw err;
            //console.log(results);
            res.render('index', {todoItems: results});
            
        })
    }); 

    app.post('/', urlEncodedParser, function(req, res){
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
