function duplicateImage() {

    const originalImage = document.getElementById('originalImage');
    const clonedImage = originalImage.cloneNode(true);

    const container = document.getElementById('container');
    container.appendChild(clonedImage);
}