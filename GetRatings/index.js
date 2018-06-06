var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var results;

var encodedPassword = encodeURIComponent(process.env.CosmosPWD);

url = process.env.CosmosPrefix + encodedPassword + process.env.CosmosSuffix;

module.exports = function (context, req) {

    // Connect to the db
    MongoClient.connect(url, function (err, db) {

        var db = db.db(process.env.CosmosDB);
        db.collection(process.env.CosmosCollection, function (err, collection) {

            collection.find().toArray(function (err, items) {
                if (err) throw err;
               results = items
            });

        });

    });

    context.res = {
        status: 200,
        body: results
    }

    context.done();
};