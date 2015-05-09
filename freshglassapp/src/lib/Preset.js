//@module

/**
 * Constructor for preset object.
 * @param {string} name          name of the preset shown below the preset preview in the preset page
 * @param {Window} windowList    window(s) this preset applie(s) to
 */
var Preset = function (name, windowList, images) {
    this.name = name || "";
    this.windowList = windowList; //window(s) this preset applie(s) to
    this.tint = 0; // 0 is transparent, 1 is opaque
    this.images = images;
    this.clearImages = false;
    this.controls = null;
    this.controls = [
        /*
        added: false, 
        url: null,
        x: null,
        y: null,
        height: null, 
        width: null,
        */
    ];
    this.preview = null;//preview of this presets, to be added to the preset page 
};

Preset.PREVIEW_WIDTH = 100; 
Preset.PREVIEW_HEIGHT = 150;

var lightGray = "#fafafa";
var presetSkin = new Skin({fill: lightGray, stroke:"black"});

/**
 * Apply the preset to each window in the preset's windowList 
 */
Preset.prototype.apply = function () {
    for (var i = 0; i < this.windowList.length; i++){
        this.windowList[i].updateFrom(this);
    }
};
/**
 * Returns the names of the windows this preset applies to
 */
Preset.prototype.getWindowsNames = function () {
    var string = "";
    for (var i = 0; i < this.windowList.length; i++){
        var temp = this.windowList[i].name + " ";
        string +=temp;
    }
    return string;
};

/**
 * Changes the preset preview kinoma container, does not return anything.
 */
Preset.prototype.addToPresetPage = function (window) {
    if (this.preview === null) {
        this.renderPreview(); // will set this.preview as the correct container
    }
    var window = this;

    this.preview.skin = new Skin({
        fill: pagedddwindow.getTintHexCode(),
        borders: {left:1, right:1, top:1, bottom:1,},
        stroke:"black"
    });
    this.updatePreviewImages();
};

Preset.prototype.updatePreviewImages = function() {
    if (this.preview === null) {
        this.renderPreview();
    }
    var preset = this;
    this.preview.empty();

    this.preview.add(new Container({
        top: 1, bottom: 1, left: 1, right: 1, // for borders
        skin: new Skin({fill:"white"}),
    }));

    for(var i = 0; i < preset.images.length; i++) {
        this.preview.add(new Picture({
            url: preset.images[i].url, 
            height: preset.images[i].height + 1, 
            width: preset.images[i].width + 1,
            top: preset.images[i].y + 1, //to not touch the top border
            left: preset.images[i].x + 1, 
            opacity:1.0, 
        }));
    }
   
    if(this.clearImages){
        this.preview.empty();
    }

};

/**
 * @return {Container} a kinoma Container object representing the preview of the preset.
 */
Preset.prototype.renderPreview = function () { //(height, width) {
	//preview when clicked
    height = 280;
    //width = width || Preset.PREVIEW_WIDTH;
    if (this.preview !== null) {
        if (this.preview.container) {
            this.preview.container.remove(this.preview);
        }
        return this.preview;
    }

    var preset = this;

    var preview = new Container({
        height: height,
        left: 0, right: 0, //top: 0, bottom: 100, //bottom
        skin: new Skin({
            borders: {left:1, right:1, top:1, bottom:1},
            stroke:"black"
        }),
        contents: []
    });
    this.preview = preview;
    this.updatePreviewImages();

    return preview;
};

module.exports = Preset;