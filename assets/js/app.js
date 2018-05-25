"use strict";

// storymap_data can be an URL or a Javascript object
var storymap_data = './assets/data/pamagicBoard.json';

// certain settings must be passed within a separate options object
var storymap_options = {
    "language": "en",
     "map_type": "osm:standard",
    "calculate_zoom": false    
};

var storymap = new VCO.StoryMap('storyMap', storymap_data, storymap_options);
window.onresize = function(event) {
    storymap.updateDisplay(); // this isn't automatic
}