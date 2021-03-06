'use strict'

const mongoose = require('mongoose');

let schema = mongoose.Schema({
    animalname : {
        type : String,
        required : true,
    },
    breedname : {
        type : String,
        required : true,
    },
    speciesname : {
        type : String,
        required : true
    },
    animalage : {
        type: Number,
        required: true
    },
    basecolour : {
        type: String,
        required: true
    },
    userId : {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Animal", schema);