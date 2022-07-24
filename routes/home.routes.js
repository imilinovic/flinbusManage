const express = require('express');
const { retrieveData } = require('../db/index.js');
const User = require('../models/UserModel.js');

const router = express.Router();

router.get('/data', async function(req, res){
    const latitude = await retrieveData("SELECT reportLatitude FROM trashReport where reportType='image'");
    const longitude = await retrieveData("SELECT reportLongitude FROM trashReport where reportType='image'");

    let lat = []
    let lon = []

    latitude.forEach (function(value, key) {
        lat.push(value['reportlatitude']);
    })
    longitude.forEach (function(value, key) {
        lon.push(value['reportlongitude']);
    })
    res.send(JSON.stringify({lat: lat, lon: lon}));
})

router.get('/', async function(req,res){
    const counter = await User.fetchAllReports()

    res.render('home', {
        title: 'Home',
        linkActive: 'home',
        user: req.session.user,
        error: undefined,
        counter: counter,
    })
})

module.exports = router