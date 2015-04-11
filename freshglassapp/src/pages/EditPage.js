//@module
var NavBar = require("lib/NavBar");
var SLIDERS = require('controls/sliders');

var EditPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
    this.currentTab = "tint";
    this.tabContainers = {
        tint: null,
        images: null,
        control: null
    };
    this.smallTabContainers = {
		tint: null, 
		images: null, 
		control: null
    };    
    this.controlContainer = null;
    this.controls = {
        tint: null,
        images: null,
        control: null
    };

    
    this.windowCopy = this.window.clone();
};

var selectedSkin = new Skin({fill: "#C2BAC6", borders:{right:2, left:2, top:2}, stroke:"black"});
var selectedSkin2 = new Skin({fill: "#C2BAC6", borders:{right:2, top:2}, stroke:"black"});
var selectedSkin3 = new Skin({fill: "#C2BAC6", borders:{left:2, top:2}, stroke:"black"});

var imagesSkin = new Skin({fill: "#C2BAC6", borders:{bottom:4, right:2}, stroke: "black"});
var controlSkin = new Skin({fill: "#C2BAC6", borders:{bottom:4}, stroke:"black"});

var applyButtonSkin = new Skin({fill: "purple", borders:{right:2, left:2, bottom: 2, top:2}, stroke:"black"});
var cancelButtonSkin = new Skin({fill: "purple", borders:{right:2, bottom: 2, top:2}, stroke:"black"});
var clearButtonSkin = new Skin({fill: "purple", borders:{right:2, left:2, bottom: 2}, stroke:"black"});

var tintSelectedSkin = new Skin({fill: "#C2BAC6", borders:{right:4, top:4}, stroke:"black"});
var imagesSelectedSkin = new Skin({fill: "#C2BAC6", borders:{left:4, right:4, top:4}, stroke:"black"});
var controlSelectedSkin = new Skin({fill: "#C2BAC6", borders:{left:4, top:4}, stroke:"black"});

var unselectedSkin = new Skin({fill: "#C2BAC6", borders:{bottom:4, top: 2}, stroke:"black"});
var unselectedSkin2 = new Skin({fill: "#C2BAC6", borders:{top: 2}, stroke:"black"});
var unselectedStyle = new Style({color: "white", font: "15px"})
var selectedStyle = new Style({color: "purple", font: "30px"})

var rightBorderSkin = new Skin({fill: "#C2BAC6", borders:{right:2, bottom: 4, top: 2}, stroke:"black"});
var addImageSkin = new Skin({fill: "purple", borders:{left:1, right:1, top:1, bottom: 1}, stroke:"black"});

    
EditPage.prototype.activateTab = function (tab) {


	this.tabContainers["control"].skin = unselectedSkin;
	this.tabContainers["images"].skin = unselectedSkin;
	this.tabContainers["tint"].skin = unselectedSkin;
	this.tabContainers["control"].first.style = unselectedStyle;
	this.tabContainers["images"].first.style = unselectedStyle;
	this.tabContainers["tint"].first.style = unselectedStyle;

    this.controlContainer.remove(this.controls[this.currentTab]);
    this.currentTab = tab;
    this.controlContainer.add(this.controls[this.currentTab]);
    
    if (this.currentTab == "tint"){
		this.tabContainers[this.currentTab].skin = tintSelectedSkin;  
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.tabContainers["images"].skin = rightBorderSkin;
    } if (this.currentTab == "images"){
		this.tabContainers[this.currentTab].skin = imagesSelectedSkin;  
		this.tabContainers[this.currentTab].first.style = selectedStyle;
    } else if (this.currentTab == "control"){
		this.tabContainers[this.currentTab].skin = controlSelectedSkin;
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.tabContainers["tint"].skin = rightBorderSkin;
		
    }

};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
EditPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var headerBar = new NavBar({ name: page.window.name, back: true, page: page });

    var TintTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: tintSelectedSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.activateTab("tint");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: selectedStyle,
                string: "Tint"
            })
        ]
    };});
    
    var TintSlider = SLIDERS.HorizontalSlider.template(function($){ return{
        left: 0, right: 0, top: 0, bottom: 0,
        behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
            onCreate: { value : function(container) {
                this.data = {min:0, max:1, value: page.window.tint}; 
            }},
            onValueChanged: { value: function(container){           
                SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
                page.windowCopy.tint = this.data.value;
            }},     
        }),
    };});

    var ImagesTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: imagesSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.activateTab("images");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: unselectedStyle,
                string: "Images"
            })
        ]
    };});
    
    var AddImageButton = BUTTONS.Button.template(function ($) { return {
        left: 5, width: 150, top: 5, bottom: 5,
        skin: addImageSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Add photo button does nothing for now.");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Add Image"
            })
        ]
    };});

    var ControlTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,

        skin: controlSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.activateTab("control");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: unselectedStyle,
                string: "Control"
            })
        ]
    };});    

    page.controls.tint = new TintSlider();
    page.controls.images = new AddImageButton(); //TODO: change!
    page.controls.control = new Container(); //TODO: change!

    page.controlContainer = new Container({
        left: 0, right: 0, height: 70,
        skin: new Skin({fill: "#C2BAC6"}),
        contents: [
            page.controls.tint
        ],
    });


    var ApplyButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: applyButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Apply button does nothing for now.");
                this.window = this.windowCopy;
                //This function still needs to send a message to the device
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: unselectedStyle,
                string: "Apply"
            })
        ]
    };});

    var CancelButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: cancelButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Cancel does nothing right now.");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Cancel"
            })
        ]
    };});

    var ClearButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: clearButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                this.window.tint = 0;
                this.window.images = []
                this.window.controls = null;
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Clear"
            })
        ]
    };});
    

    page.tabContainers.tint = new TintTab();
    page.tabContainers.images = new ImagesTab();
    page.tabContainers.control = new ControlTab();

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "#C2BAC6"}),
        contents: [
            headerBar,
            new Line({
                left: 0, right: 0, height: 35,
                contents: [
                    page.tabContainers.tint,
                    page.tabContainers.images,
                    page.tabContainers.control
                ]
            }),
            page.controlContainer,
            new Container({
                left: 0, right: 0, top: 0, bottom: 0,
                contents: [
                    page.window.renderPreview(),
                ]
            }),
            new Line({
                left: 0, right: 0, height: 35,
                contents: [
                    new ApplyButton(),
                    new CancelButton()
                ]
            }),
            new Line({
                left: 0, right: 0, height: 35,
                contents: [
                    new ClearButton()
                ]
            }),
        ]
    });

    this.container = rootColumn;
    return this.container; // TODO: implement
};

module.exports = EditPage;