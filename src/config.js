// Conncect Database
const mongoose = require('mongoose');
const { Schema } = mongoose;
const url = `mongodb+srv://roh727an:red8420231250mi@cluster0.aocdaac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connect=mongoose.connect(url);
connect.then(()=>{
console.log("Datebase Connected SUccessfully");
})
.catch(()=>{
    console.log("Datebase cannot be Connected SUccessfully");
})

// Create a Schema -> USer
const UserSchema = new Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: Number
    }
  });

  const collection=new mongoose.model("users",UserSchema);
  module.exports = collection;