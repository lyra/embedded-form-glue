'use strict';

const path = require("path");

module.exports = {
    entry: "./app/glue.js",
    devtool: 'source-map',
    mode: "production",
    output: {
        filename: "kr-payment-form-glue.min.js",
        path: path.resolve(__dirname + "/dist/js")
    },
};
