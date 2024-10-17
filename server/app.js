require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var app = express();

var authRouter = require('./src/auth/auth.controller')
var userRouter = require('./src/user/user.controller')
var homestayRouter = require('./src/homestay/homestay.controller')
var geoRouter = require('./src/geoJSON/geo.controller')
var TourismRouter = require('./src/tourismVillage/tourism.controller')
var AnnouncementRouter = require('./src/announcement/announcement.controller')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/homestays', homestayRouter);
app.use('/geo', geoRouter);
app.use('/tourism', TourismRouter);
app.use('/announcement', AnnouncementRouter);

module.exports = app;
