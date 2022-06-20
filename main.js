import './style.css';
import {
  Map,
  View
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {
  fromLonLat
} from 'ol/proj';

// Create a Map starting at a given location.
const robinCenter = fromLonLat([-157.679559, 21.324921]); // longitude first, then latitude
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: robinCenter,
    zoom: 17
  })
});

const view = new View({
  center: [0, 0],
  zoom: 1,
});

// Return back to the center using the home logo button.
document.getElementById('home-btn').addEventListener('click', homeZoom);

function homeZoom() {
  var centerView = new View({
    center: robinCenter,
    zoom: 17
  });
  map.setView(centerView);
}