"use strict";

// storymap_data can be an URL or a Javascript object
const storymap_data = './assets/data/pamagicBoard.json';

// certain settings must be passed within a separate options object
const storymap_options = {
    "language": "en",
     "map_type": "osm:standard",
    "calculate_zoom": false
};

// the story map object
const storymap = new VCO.StoryMap('storyMap', storymap_data, storymap_options);

// determien whether user is accessing site from mobile or desktop device
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

// function to add alt text to images
function addAltTextToImage() {
    // counter for slide number
    const currentSlide = storymap.current_slide;
    // image element for current slide
    const slideImage = document.getElementsByClassName('vco-media-image')[currentSlide];
    // text content for current slide heading
    const headlineText = document.getElementsByClassName('vco-headline')[currentSlide].textContent;
    // set alt text to headline text
    slideImage.alt = headlineText;
}

// update display on resize of window
window.onresize = function(event) {
    storymap.updateDisplay(); // this isn't automatic
}

// add alt attribute to images on slide changes
storymap.on("change", addAltTextToImage);

// event for when the story map is loaded
storymap.on("loaded", function() {
    // leaflet map object
    const leafletMap = storymap.map;
    // create a zoom control and add to map
    const zoomControl = L.control.zoom({position:'topleft'}).addTo(leafletMap);
    // determine user device type
    var userDevice = detectDeviceType();
    // add alt image to initial image if desktop device
    // running this function within "loaded" event on mobile causes error and app not loading
    if (userDevice === 'Desktop') {
        addAltTextToImage();
    }
});