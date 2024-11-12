// Modules
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./config')
const eventcollection = require('./config2')
const mongoose = require('mongoose');


const app = express()
const port = 5000

// **************
const evtmodel=mongoose.model("events","EventSchema",eventcollection);

// Convert Data into JSON FOrmat
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ejs as View Engine & public as Static file
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Routs : GET REQUESTS
// Default Page : Login 
// Authentication ->
app.get('/', (req, res) => {
  res.render("login")
})
// Sigup Page
app.get('/signup', (req, res) => {
  res.render("signup")
})


// Web Pages ->
// Main/Home Page
app.get('/index', (req, res) => {
  res.render("index")
})
// Event Page
app.get('/event', (req, res) => {
  res.render("event")
})
// Ticket Page
app.get('/ticket', (req, res) => {
  res.render("ticket")
})
// Contact Page
app.get('/contact', (req, res) => {
  res.render("contact1")
})



// Redirect Pages ->
// Thank Page
app.get('/thank', (req, res) => {
  res.render("thank")
})
// Purchase Page
app.get('/purchase', (req, res) => {
  res.render("purchase")
})
// Success Page
app.get('/success', (req, res) => {
  res.render("success")
})
// Fail Pay Page
app.get('/failpay', (req, res) => {
  res.render("failPay")
})
// Fail Log Page
app.get('/fail', (req, res) => {
  res.render("failLog")
})



// Admin ->
// Admin Login Page
app.get('/adminLogin', (req, res) => {
  res.render("adminLogin")
})

// *******
// Admin Pannel Page
app.get('/adminPannel', async(req, res) => {

  
  
})









// POST REQUESTS
// SIGNUP
app.post('/signup', async (req, res) => {
  // USER Given DATA
  const data = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact
  }
  // Check if User Already Exists or Not
  const exists = await collection.findOne({ email: data.email })
  if (exists) {
    res.render("failLog");
  }
  else {
    const userData = await collection.insertMany(data);
    console.log(userData);
    // userData.save();// ***
    res.render('successSign')
  }
})

// LOGIN
app.post('/login', async (req, res) => {
  // USER Given DATA
  const data = {
    email: req.body.email,
    password: req.body.password
  }
  // Check if User Already Exists or Not
  const exists = await collection.findOne({ email: data.email })
  if (exists) {
    // If Password Matches -> Home
    if (exists.password === req.body.password){
      // data.save(); // ***
      res.render('index');
    }
    else {
      res.render("failLog");
    }
  }
  else {
    res.render("failLog");
  }
})

// ADMIN
app.post('/adminlogin', async (req, res) => {
  // USER Given DATA
  const adminData = {
    email: req.body.email,
    password: req.body.password
  }
  // ADMIN DATA 
  const admin = {
    email: "admin777@gmail.com",
    password: "1234"
  }

  // Check if User already Exists or Not
  const exists = await collection.findOne({ email: adminData.email });

  // If exists & Password & Email matches with Admin -> ADMIN PANNEL | FAIL
  if (exists) {
    if (admin.password === adminData.password && admin.email === adminData.email){
      // Fetch Admin 
    const data={
    userEmail:"rohansaha@gmail.com",
    eventName:"Fossils Show",
    eventVenue:"Netaji Indor Stadium",
    city:"Kolkata",
    payment:"true"
    }
    try {
    const fetchEventData=await eventcollection.find({});
    const fetchUserData=await collection.find({});
   
    res.render("adminPannel",{ fetchEventData: fetchEventData ,fetchUserData: fetchUserData});
    // res.send("Hello");
    } catch (error) {
      res.send("failadmin");
    }
    }
    // FAIL0
    else
      res.render("failadmin");
  }
  else {
    res.render("failadmin");
  }
})

// Purchse Page
app.post('/purchase', async (req, res) => {

  const eventdata = {
    userEmail: req.body.userEmail,
    eventName: req.body.eventName,
    eventVenue: req.body.eventVenue,
    city: req.body.city,
    payment: true
  }
  const eveData = await eventcollection.insertMany(eventdata);
  console.log(eveData);
  // eveData.save(); // ***
  res.render('successPay')

})




// App Listinig
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})