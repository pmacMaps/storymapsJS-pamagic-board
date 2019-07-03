"use strict";

// storymap_data can be an URL or a Javascript object
const storymap_data = './assets/data/pamagicBoard.json';

// certain settings must be passed within a separate options object
const storymap_options = {
    "language": "en",
     "map_type": "osm:standard",
    "calculate_zoom": false    
};

const storymap = new VCO.StoryMap('storyMap', storymap_data, storymap_options);

window.onresize = function(event) {
    storymap.updateDisplay(); // this isn't automatic
}

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

// storymap loaded
// this works on desktop devices. It causes map to not load on mobile in portrait
//storymap.on("loaded", addAltTextToImage);
// slide changes
storymap.on("change", addAltTextToImage);