require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});
var authRouter = require('./src/auth/auth.controller')
var userRouter = require('./src/user/user.controller')
var homestayRouter = require('./src/homestay/homestay.controller')
var geoRouter = require('./src/geoJSON/geo.controller')
var tourismRouter = require('./src/tourismVillage/tourism.controller')
var announcementRouter = require('./src/announcement/announcement.controller')
var galleryRouter = require('./src/gallery/gallery.controller')
var detailPackageRouter = require('./src/detailPackage/detailPackage.controller')
const objectRouter = require('./src/object/object.controller')
const packageRouter = require('./src/package/package.controller')
const detailServiceRouter = require('./src/detailServicePackage/detailService.controller')
const reserveationRouter = require('./src/reservation/reservation.controller')
const detailReservationRouter = require('./src/detailReservation/detailReservation.controller')
const homestayFacilityRouter = require('./src/homestayFacility/homestayFacility.controller') 
const cartRouter = require('./src/cart/cart.controller')

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/homestays', homestayRouter);
app.use('/geo', geoRouter);
app.use('/tourism', tourismRouter);
app.use('/announcement', announcementRouter);
app.use('/gallery', galleryRouter);
app.use('/detailPackage', detailPackageRouter);
app.use('/object', objectRouter)
app.use('/packages', packageRouter)
app.use('/services', detailServiceRouter)
app.use('/reservations', reserveationRouter)
app.use('/detailReservations', detailReservationRouter)
app.use('/homestay-facility', homestayFacilityRouter)
app.use('/carts', cartRouter)


app.use('*',(req,res)=>{
    res.status(404).json({message: 'Not Found'})
})

module.exports = app;