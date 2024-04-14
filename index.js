function duplicateImage() {

    const originalImage = document.getElementById('img2');
    const clonedImage = originalImage.cloneNode(true);

    const container = document.getElementById('row');
    container.appendChild(clonedImage);
}