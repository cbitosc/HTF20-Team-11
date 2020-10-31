const express = require('express');

const app = express();

// HOD

// Faculty
const faculty_loginRoute = require('./api/routes/faculty/faculty_login');
const faculty_notificationsRoute = require ('./api/routes/faculty/faculty_notifications');
const apply_leavesRoute = require('./api/routes/faculty/apply_leave')
const faculty_profileRoute = require('./api/routes/faculty/faculty_profile')
const faculty_leavesRoute = require('./api/routes/faculty/faculty_leaves')


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Faculty
app.use('/faculty_notifications',faculty_notificationsRoute);
app.use('/faculty_login',faculty_loginRoute);
app.use('/apply_leave', apply_leavesRoute)
app.use('/faculty_profile', faculty_profileRoute)
app.use('/faculty_leaves', faculty_leavesRoute)



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Shrikar:<password>@cluster0.lwbvg.mongodb.net/<dbname>?retryWrites=true&w=majority";

module.exports=app;
 