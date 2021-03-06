'use strict'

const mongoose = require('mongoose');

let schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("User", schema);