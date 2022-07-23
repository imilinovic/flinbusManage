const express = require('express');
const { retrieveData } = require('../db/index.js')

const router = express.Router();

router.get('/data', async function(req, res){
    const latitude = await retrieveData("SELECT locationLatitude FROM location");
    const longitude = await retrieveData("SELECT locationLongitude FROM location");
    console.log("latitude", latitude)
    console.log("longitude", longitude)

    let lat = []
    let lon = []

    latitude.forEach (function(value, key) {
        console.log(value);
        lat.push(value['locationlatitude']);
    })
    longitude.forEach (function(value, key) {
        lon.push(value['locationlongitude']);
    })

    res.send(JSON.stringify({lat: lat, lon: lon}));
})

router.get('/', function(req,res){
    res.render('home')
})

module.exports = router