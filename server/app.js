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
var GalleryRouter = require('./src/gallery/gallery.controller')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
    origin: 'http://localhost:3000',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',  
    credentials: true,  
  };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });
  
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/homestays', homestayRouter);
app.use('/geo', geoRouter);
app.use('/tourism', TourismRouter);
app.use('/announcement', AnnouncementRouter);
app.use('/gallery', GalleryRouter);

module.exports = app;
