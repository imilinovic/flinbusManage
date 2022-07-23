import { pool } from '../../db/index.js';
const Plotly = require('plotly.js-dist')
//import { Plotly } from 'plotly.js-dist'

async function retrieveData(command) {
  try {
    const res = await pool.query(command);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function showMap() {
    const latitude = await retrieveData("SELECT locationLatitude FROM location");
    const longitude = await retrieveData("SELECT locationLongitude FROM location");
    console.log("latitude", latitude)
    console.log("longitude", longitude)

    lat = []
    lon = []
    for (const obj of latitude){
        for (const [key, value] of Object.entries(obj)) {
            lat.push(value)
          }
    }
    for (const obj of longitude){
        for (const [key, value] of Object.entries(obj)) {
            lon.push(value)
          }
    }
    console.log(lat)
    console.log(lon)
    var data = [{type: 'densitymapbox', lon: lon, lat: lat, radius: 5, zoom: 11.5, center: {lat: 45.3239, lon: 14.46456}}];
    var layout = {width: 600, height: 400, mapbox: {style: 'stamen-terrain'}}
    console.log("PRINTAM")
    Plotly.newPlot("myPlot", data, layout);
}

