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
    this.statusPage = null;
    // NOTE: size is hardcoded (v2.0 feature)
    this.preview = null; // kinoma container for window preview that will be used on multiple pages
};
Window.HEX_TINT = "94895f"; // the hex code for the color that the window gets tinted

/**
 * Return a hex code of the form "#AARRGGBB" where RRGGBB is Window.HEX_TINT and
 * AA is a hex alpha value based on the window's tint.
 */
Window.prototype.getTintHexCode = function () {
    var alpha = Math.round(this.tint * 255);
    var hexString = (alpha + 0x10000).toString(16);
    var hex = hexString.substring(hexString.length - 2, hexString.length).toUpperCase();
    return "#" + hex + Window.HEX_TINT;
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
 * Changes the window preview kinoma container, does not return anything.
 */
Window.prototype.updatePreview = function () {
    trace("updatePreview called\n");
    if (this.preview === null) {
        this.renderPreview(); // will set this.preview as the correct container
    }
    var window = this;

    this.preview.skin = new Skin({
        fill: window.getTintHexCode(),
        borders: {left:3, right:3, top:3, bottom:3},
        stroke:"black"
    });
    trace("updatePreview done\n");
};

/**
 * @return {Container} a kinoma Container object representing the preview of the window.
 */
Window.prototype.renderPreview = function () {
    if (this.preview !== null) {
        return this.preview;
    }

    var window = this;
    var preview = new Container({
        height: 200, width: 200, bottom: 50,
        skin: new Skin({
            fill: window.getTintHexCode(),
            borders: {left:3, right:3, top:3, bottom:3},
            stroke:"black"
        }),
        contents: [
            new Label({
                top: 0, bottom: 0, left: 0, right: 0,
                style: new Style({color: "black"}),
                string: "This is a window preview."
            })
        ]
    });
    this.preview = preview;
    return preview;
};

module.exports = Window;