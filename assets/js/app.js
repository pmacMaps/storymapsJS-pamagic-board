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

// test if device is iOS
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// function to add alt text to images
function addAltTextToImage() {
    // counter for slide number
    var currentSlide = storymap.current_slide;
    // image element for current slide
    var slideImage = document.getElementsByClassName('vco-media-image')[currentSlide];
    // text content for current slide heading
    var headlineText = document.getElementsByClassName('vco-headline')[currentSlide].textContent;
    // set alt text to headline text 
    slideImage.alt = headlineText;      
}

// function to rotate dave gilbert image on iOS
function rotateDgPhoto() {
    if (iOS) {
       // counter for slide number
       var currentSlide = storymap.current_slide;
       // image element for current slide
       var slideImage = document.getElementsByClassName('vco-media-image')[currentSlide];
       // src property
       var src = slideImage.src;
       // components of src
       var fileNameComponents = src.split("/");
       // see if array contains target filename
       var includesPhoto = fileNameComponents.includes("dave_gilbert.JPG");
       // if target photo is on slide, rotate it 180 degrees
       if (includesPhoto) {
          slideImage.style.transform = "rotate(180deg)";
       } 
    }    
}

// Event listeners
// window resize
window.onresize = function(event) {
    storymap.updateDisplay(); // this isn't automatic
}
// storymap loaded
storymap.on("loaded", addAltTextToImage);
// slide changes
storymap.on("change", function() {
    addAltTextToImage();
    rotateDgPhoto();
});