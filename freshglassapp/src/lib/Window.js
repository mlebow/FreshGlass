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

Window.prototype.clone = function () {
    var clone = new Window(this.name);
    clone.tint = this.tint;
    clone.images = this.images;
    clone.controls = this.controls;
    return clone;
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
    return new Container({
        height: 300, width: 250, bottom: 50, 
        skin: new Skin({fill: "white", borders:{left:3, right:3, top:3, bottom:3}, stroke:"black"}),
        contents: [
            new Label({
                top: 0, bottom: 0, left: 0, right: 0,
                style: new Style({color: "black"}),
                string: "This is a window preview."
            })
        ]
    });
};

module.exports = Window;