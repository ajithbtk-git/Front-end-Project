function duplicateImage(id) {

    const originalImage = id;
    const clonedImage = originalImage.cloneNode(true);

    const container = document.getElementById('row');
    container.appendChild(clonedImage);
    
}

