module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body.productId == '27') {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "This starfruit ice cream is out of this world!"
        };
    }   
    else {
        context.res = {
            status: 200,
            body: "Product not found " + req.body.productId
        };
    }
    context.done();
};