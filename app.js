const express = require('express')
const path = require('path')
const indexRouter = require('./routes/home.route.js')

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes 
app.use('/', indexRouter);

app.listen(3000);