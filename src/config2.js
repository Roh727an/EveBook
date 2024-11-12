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

// Create a Schema -> Event
const EventSchema = new Schema({
    userEmail:{
        type: String,
        required: true
    },
    eventName:{
        type: String,
        required: true,
        unique:true
    },
    eventVenue:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    payemnt:{
        type: Boolean,
        default:true
    }
  });

  const eventcollection=new mongoose.model("events",EventSchema);
  module.exports = eventcollection;