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
        // {url: "...", top: 0, left: 0, width: 10, height: 10}
    ];
    this.control = {
    	added: false, 
        url: null,
        x: null,
        y: null,
        height: null, 
        width: null,
    };        
    // TODO: implement this!
    this.statusPage = null;
    // NOTE: size is hardcoded (v2.0 feature)
    this.preview = null; // kinoma container for window preview that will be used on multiple pages
};
Window.HEX_TINT = "94895f"; // the hex code for the color that the window gets tinted
Window.PREVIEW_WIDTH = 200;
Window.PREVIEW_HEIGHT = 200;
Window.currentImageId = 0;

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
 * Add an image to the window.
 * @param {string} url   the http:// url for the image source
 * @param {float} scale  between 0 and 1, the scale of the image
 * @param {int} x        the x position, in pixels
 * @param {int} y        the y position, in pixels
 * @return {int}         the unique ID of the image for use with getImageByID
 */
Window.prototype.addImage = function (url, x, y, height, width) {
    var newID = Window.currentImageId;
    this.images.push({
        url: url,
        x: x,
        y: y,
        height: height,
        width: width,
        id: newID
    });
    this.updatePreview();
    Window.currentImageId++;
    return newID;
};

Window.prototype.addControl = function (url, x, y, height, width) {
	this.control.added = true,
    this.control.x = x,
    this.control.url = url,
	this.control.y = y,
    this.control.height = height,
    this.control.width = width,
    
    this.updatePreview();
};

/**
 * Return the image of this window specified by the given id, or null if no
 * image found with that id. For example:
 *
 * var imageID = this.window.addImage(...);
 * this.window.getImageByID(imageID).x = 50;
 * this.window.updatePreview();
 */
Window.prototype.getImageByID = function(id) {
    for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].id === id) {
            return this.images[i];
        }
    }
    return null;
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
 * Return a new Window that is exactly the same as this window.
 */
Window.prototype.clone = function () {
    var clone = new Window(this.name);
    clone.tint = this.tint;
    clone.images = this.images;
    clone.controls = this.controls;
    return clone;
};

/**
 * Given a window, make this window exactly the same as the given window.
 */
Window.prototype.updateFrom = function (window) {
    this.tint = window.tint;
    this.images = window.images;
    this.controls = window.controls;
};

/**
 * Return a string representation of this window to send to the device.
 */
Window.prototype.serialize = function () {
    return JSON.stringify({
        name: this.name,
        tint: this.tint,
        images: this.images,
        controls: this.controls // WARNING: this assumes whatever we store in controls is valid JSON
    });
};

/**
 * Given a string representation of a window as returned from Window.prototype.serialize,
 * return an actual copy of the window it represents.
 */
Window.deserialize = function (data) {
    var obj = JSON.parse(data);
    var window = new Window(obj.name);
    window.tint = obj.tint;
    window.images = obj.images;
    window.controls = obj.controls;
    return window;
};

/**
 * Changes the window preview kinoma container, does not return anything.
 */
Window.prototype.updatePreview = function () {
    if (this.preview === null) {
        this.renderPreview(); // will set this.preview as the correct container
    }
    var window = this;

    this.preview.skin = new Skin({
        fill: window.getTintHexCode(),
        borders: {left:3, right:3, top:3, bottom:3},
        stroke:"black"
    });
    this.updatePreviewImages();
};

Window.prototype.updatePreviewImages = function() {
    if (this.preview === null) {
        this.renderPreview();
    }
    var window = this;
    this.preview.empty();

    this.preview.add(new Container({
        top: 3, bottom: 3, left: 3, right: 3, // for borders
        skin: new Skin({fill: window.getTintHexCode()}),
    }));

    for (var i = 0; i < window.images.length; i++) {
        this.preview.add(new Picture({
            url: window.images[i].url,
            height: window.images[i].height,
            width: window.images[i].width,
            top: window.images[i].y + 3,//to not touch the top border
            left: window.images[i].x, 
            opacity:.5, 
        }));
    }
    if (this.control.added == true){
	    this.preview.add(new Picture({
	        url: window.control.url,
	        height: window.control.height,
	        width: window.control.width,
	        top: window.control.y,
	        left: window.control.x  
		}))    
    
    } 

    
};

/**
 * @return {Container} a kinoma Container object representing the preview of the window.
 */
Window.prototype.renderPreview = function (height, width) {
    height = height || Window.PREVIEW_HEIGHT;
    width = width || Window.PREVIEW_WIDTH;
    if (this.preview !== null) {
        if (this.preview.container) {
            this.preview.container.remove(this.preview);
        }
        return this.preview;
    }

    var window = this;

    var preview = new Container({
        height: height, width: width,
        skin: new Skin({
            borders: {left:3, right:3, top:3, bottom:3},
            stroke:"black"
        }),
        contents: []
    });
    this.preview = preview;

    this.updatePreviewImages();
    return preview;
};

module.exports = Window;