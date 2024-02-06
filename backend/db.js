const mongoose = require("mongoose");
mongoose.connect(/* MongoDB URL */)

const userSchema = new mongoose.Schema({
   username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength: 30
   },

   password : {
        type : String,
        required : true,
        minLength : 6
   },

   firstName : {
        type : String,
        required: true,
        trim : true,
        maxLength : 50
    },

    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }



})


const accountsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    balance  : {
        type : Number,
        required : true
    }
})



const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Accounts', accountsSchema)

module.exports = {
    User,
    Account
};


