//var webpack = require('webpack');
module.exports = {
    entry: {
        "beon_order"    : __dirname + "/controllers/order.js",
    },
    output: {
        path: __dirname + "/../../../templates/assets/js",
        //filename: "[name].min.js", -> for production
        filename: "[name].js",
    },
};