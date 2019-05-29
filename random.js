function randomRange(min, max) { //inclusive for min and max
    return Math.floor(Math.random()*(max-min+1))+min;
}

function randomShipColor() {
    const colors = [randomRange(100, 255), randomRange(100, 255), randomRange(100, 255)];
    return 'rgb(' + colors.join(',') + ')';
}
