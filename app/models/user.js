var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    regNo : {
        type : String,
        unique : true,
        uppercase : true,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        lowercase : true,
        required : true,
        trim : true
    },
    password  : String,
    verified : {
        type : Boolean,
        default : false
    },
    dateRegistered : {
        type : Date,
        required : true
    },
    contact : String,
    team : {
        type : mongoose.Schema.ObjectId,
        ref : "Team"
    },
    gender : {
        type : String,
        enum : ["male","female"],
        required : true
    },
    skills : [String],
    github : String,
    linkedIn : String,
    behance : String
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
