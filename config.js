const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://127.0.0.1:27017/Login")

connect.then(function () {
    console.log("Database successfully connected")
})
.catch(function () {
    console.log("Failed")
})

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    }
})

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;