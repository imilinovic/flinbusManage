(async function f(){
  let res = await fetch('/data');
  const cords = await res.json();

  console.log(cords);
    
  var xArray = [50,60,70,80,90,100,110,120,130,140,150];
  var yArray = [7,8,8,9,9,9,10,11,14,14,15];
  
  // Define Data
  var data = [{type: 'densitymapbox', lon: cords.lon, lat: cords.lat, radius: 10}];
  
  //var layout = {width: 600, height: 400, mapbox: {style: 'stamen-terrain'}}
  var layout = {mapbox: {style: 'stamen-terrain', center: {lat: 45.3239, lon: 14.46456}, zoom: 11.5}, width: 600, height: 400};
  console.log("PRINTAM")
  Plotly.newPlot("myPlot", data, layout);
})();





