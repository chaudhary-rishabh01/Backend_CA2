const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    author : {
        type : String,
    },
    category : {
        type : String,
    },
    availabilityStatus : {
        type : String,
    },
    creationDate : {
        type : Date,
        required : true
    }
});

const bookModel = mongoose.model("bookModel", bookSchema);

module.exports = bookModel;