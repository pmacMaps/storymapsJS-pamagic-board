"use strict";

// storymap_data can be an URL or a Javascript object
var storymap_data = './assets/data/pamagicBoard.json';

// certain settings must be passed within a separate options object
var storymap_options = {
    "language": "en",
    "map_type": "mapbox:mapbox.emerald",
    "calculate_zoom": false    
};

var storymap = new VCO.StoryMap('storyMap', storymap_data, storymap_options);

// function to add alt text to images
function addAltTextToImage() {
    // counter for slide number
    var currentSlide = this.current_slide;
    // image element for current slide
    var slideImage = document.getElementsByClassName('vco-media-image')[currentSlide];
    // text content for current slide heading
    var headlineText = document.getElementsByClassName('vco-headline')[currentSlide].textContent;
    // set alt text to headline text 
    slideImage.alt = headlineText;      
}

// Event listeners
// storymap loaded
storymap.on("loaded", addAltTextToImage);
// slide changes
storymap.on("change", addAltTextToImage);
// window resize
window.onresize = function(event) {
    storymap.updateDisplay(); // this isn't automatic
}