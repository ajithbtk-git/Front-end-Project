function duplicateImage(id) {

    const originalImage = id;
    const clonedImage = originalImage.cloneNode(true);

    const container = document.getElementById('row');
    container.appendChild(clonedImage);
    
}


function averageColor(imageElement, parentElement) {
 
    // Create the canvas element
    var canvas
        = document.createElement('canvas'),

        // Get the 2D context of the canvas
        context
            = canvas.getContext &&
            canvas.getContext('2d'),
        imgData, width, height,
        length,

        // Define variables for storing
        // the individual red, blue and
        // green colors
        rgb = { r: 0, g: 0, b: 0 },

        // Define variable for the 
        // total number of colors
        count = 0;

    // Set the height and width equal
    // to that of the canvas and the image
    height = canvas.height =
        imageElement.naturalHeight ||
        imageElement.offsetHeight ||
        imageElement.height;
    width = canvas.width =
        imageElement.naturalWidth ||
        imageElement.offsetWidth ||
        imageElement.width;

    // Draw the image to the canvas
    context.drawImage(imageElement, 0, 0);
    imageElement.crossOrigin = "anonymous";
    // Get the data of the image
    imgData = context.getImageData(
                0, 0, width, height);

    // Get the length of image data object
    length = imgData.data.length;

    for (var i = 0; i < length; i += 4) {

        // Sum all values of red colour
        rgb.r += imgData.data[i];

        // Sum all values of green colour
        rgb.g += imgData.data[i + 1];

        // Sum all values of blue colour
        rgb.b += imgData.data[i + 2];

        // Increment the total number of
        // values of rgb colours
        count++;
    }

    // Find the average of red
    rgb.r
        = Math.floor(rgb.r / count);

    // Find the average of green
    rgb.g
        = Math.floor(rgb.g / count);

    // Find the average of blue
    rgb.b
        = Math.floor(rgb.b / count);


    var result = ""

    if(rgb.r > rgb.g){
        if(rgb.r > rgb.b){
            result = "red";
        }
        else{
            result = "blue"
        }
    }
    else{
        if(rgb.g > rgb.b){
            result = "green"
        }
        else{
            result = "blue"
        }
    }
    
    const para = document.createElement("p");
    para.style.color = result;
    const node = document.createTextNode("The image is "+ result+"ish");
    para.appendChild(node);

    parentElement.appendChild(para);
    
}

function changeColor(imageElement, toColor) {
 
    var myImage = new Image();
    // Create the canvas element
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    height = canvas.height = imageElement.naturalHeight || imageElement.offsetHeight || imageElement.height;
    width = canvas.width = imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;


    // Draw the image to the canvas
    context.drawImage(imageElement, 0, 0);

    imageElement.crossOrigin = "anonymous";
    // Get the data of the image
    imgData = context.getImageData(
                0, 0, width, height);

    // Get the length of image data object
    length = imgData.data.length;

    for (var i = 0; i < length; i += 4) {
        if(toColor == 'red'){
            imgData.data[i] = imgData.data[i+1] + imgData.data[i+2];
        }
        else if(toColor == 'green'){
            imgData.data[i+1] = imgData.data[i] + imgData.data[i+2];
        }
        else{
            imgData.data[i+2] = imgData.data[i] + imgData.data[i+1];
        }
        
        
    }

    context.putImageData(imgData, 0, 0);
    imageElement.src = canvas.toDataURL();
}

function showDropdown() {

    const elements = document.querySelectorAll('[id^="submenu-"]');
    
    elements.forEach(element => {
        
        element.style.display = 'block';
        element.style.left = '50px'; // Adjust left position as needed
    });
}

function hideDropdown() {
    // Select all elements with IDs starting with 'submenu-'
    const elements = document.querySelectorAll('[id^="submenu-"]');
    
    // Loop through each element and hide its dropdown menu
    elements.forEach(element => {
        element.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[id^="submenu-"]');
    elements.forEach(element => {
        element.addEventListener('mouseenter', showDropdown);
        element.addEventListener('mouseleave', hideDropdown);
    });
});


let brightnessLevel = 100;

function increaseBrightness(imgid) {
    brightnessLevel += 10;
    if (brightnessLevel > 200) { // Limit brightness to 200% (maximum)
        brightnessLevel = 200;
    }
    document.getElementById(imgid).style.filter = `brightness(${brightnessLevel}%)`;
}
