var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var results;
var ratingId;
var encodedPassword = encodeURIComponent(process.env.CosmosPWD);

url = process.env.CosmosPrefix + encodedPassword + process.env.CosmosSuffix;

module.exports = function (context, req) {

    if (req.body.ratingId != '') {
        ratingId = req.body.ratingId;
    } else {
        context.res = {
            status: 404,
            body: ''
        }
    }

    // Connect to the db
    MongoClient.connect(url, function (err, db) {

        var db = db.db(process.env.CosmosDB);
        db.collection(process.env.CosmosCollection, function (err, collection) {
            var query = { id: ratingId };
            collection.find(query).toArray(function (err, items) {
                if (err)
                { 
                    context.res = {
                        status: 404,
                        body: ''
                    }
                }
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