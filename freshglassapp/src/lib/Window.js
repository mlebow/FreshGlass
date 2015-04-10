//@module

/**
 * Constructor for window object.
 */
var Window = function (name) {
    this.name = name || "";
    this.tint = 0; // 0 is transparent, 1 is opaque
    this.temperature = null; // will be set eventually to degress fahrenheit
    this.brightness = null; // will be set between 0 (no sun) to 1 (max sun we can detect)
    this.images = [
        // {url: "...", top: 0, left: 0, scale: 0.5}
    ];
    this.controls = null; // TODO: implement this!
    // NOTE: size is hardcoded (v2.0 feature)
};

/**
 * Update the window to store the data from the kinoma create pins.
 * @param  {float} temperature
 * @param  {float} brightness
 */
Window.prototype.updateSensorData = function (temperature, brightness) {
    this.temperature = temperature;
    this.brightness = brightness;
};

/**
 * Return a string representation of this window to send to the device.
 * TODO: implement
 */
Window.prototype.serialize = function () {
    return JSON.stringify({});
};

/**
 * @return {Container} a kinoma Container object representing the preview of the window.
 * TODO: implement this
 */
Window.prototype.renderPreview = function () {
    return new Container();
};

module.exports = Window;