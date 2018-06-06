var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var results;
var ratingId;
var encodedPassword = encodeURIComponent(process.env.CosmosPWD);

url = process.env.CosmosPrefix + encodedPassword + process.env.CosmosSuffix;

module.exports = function (context, req) {

    MongoClient.connect(url, function (err, db) {

        var db = db.db(process.env.CosmosDB);

        //Let's validate the userId
        db.collection(process.env.CosmosCollection, function (err, collection) {
            var query = { userId: req.body.userId };
            collection.find(query).toArray(function (err, items) {
                if (err)
                { 
                    context.res = {
                        status: 404,
                        body: 'User not found'
                    }
                }
               results = items
            });

        });

         //Let's validate the productId
         db.collection(process.env.CosmosCollection, function (err, collection) {
            var query = { productId: req.body.productId };
            collection.find(query).toArray(function (err, items) {
                if (err)
                { 
                    context.res = {
                        status: 404,
                        body: 'Product not found'
                    }
                }
               results = items
            });

        });

        db.collection(process.env.CosmosCollection).insert(req.body);
        context.log("Inserted a ratings update into collection - " + req.body);
        context.res = {
            status: 200,
            body: req.body
        }


    });

    context.done();
};