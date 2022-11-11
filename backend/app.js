const express = require("express");
const passport = require('passport');
const session = require('express-session');
const app = express();


app.use(express.json());

//Passport middlware
app.use(passport.initialize())
app.use(passport.session())

// import all routes
const products = require("./routes/product");

//Passport config
require('./config/passport')(passport)

//Session Middleware
app.use(
    session({
        secret: 'olemiss',
        resave: false,
        saveUninitialized: false,
    })
)



//Routes
app.use('/auth', require('/routes/auth'))
app.use("/api/v1", products);

module.exports = app;
