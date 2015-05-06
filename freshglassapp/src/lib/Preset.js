//@module

/**
 * Constructor for preset object.
 */
var Preview = function (name) {
    this.name = name || "";
    this.tint = 0; // 0 is transparent, 1 is opaque
    this.temperature = null; // will be set eventually to degress fahrenheit
    this.brightness = null; // will be set between 0 (no sun) to 1 (max sun we can detect)
    this.images = [
        // {url: "...", top: 0, left: 0, width: 10, height: 10}
    ];
    this.clearImages = false;
    this.controls = null;
    /*
    this.control = {
    	added: false, 
        url: null,
        x: null,
        y: null,
        height: null, 
        width: null,
    };
*/
	this.height = 100;
	this.width = 100;
};


