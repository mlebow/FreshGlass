//@module
var NavBar = require("lib/NavBar");
var SLIDERS = require('controls/sliders');

var EditPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.window.tint = null;
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
var applyButtonSkin = new Skin({fill: "white", borders:{right:2, left:2, bottom: 2, top:2}, stroke:"black"});
var cancelButtonSkin = new Skin({fill: "white", borders:{right:2, bottom: 2, top:2}, stroke:"black"});
var clearButtonSkin = new Skin({fill: "white", borders:{right:2, left:2, bottom: 2}, stroke:"black"});

var imagesSkin = new Skin({fill: blue, borders:{bottom:4, right:2}, stroke: "black"});
var controlSkin = new Skin({fill: green, borders:{bottom:4}, stroke:"black"});

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "AF6DC5";
var darkBlue = "#43489B";

var tintContainerSkin = new Skin({fill: red});
var imagesContainerSkin = new Skin({fill: blue});
var controlContainerSkin = new Skin({fill: green});

var tintSelectedSkin = new Skin({fill: red, borders:{right:4, top:4}, stroke:"black"});
var imagesSelectedSkin = new Skin({fill: blue, borders:{left:4, right:4, top:4}, stroke:"black"});
var controlSelectedSkin = new Skin({fill: green, borders:{left:4, top:4}, stroke:"black"});

var unselectedTintSkin = new Skin({fill: red, borders:{bottom:4, top: 2, right: 2}, stroke:"black"});
var unselectedImagesSkin = new Skin({fill: blue, borders:{bottom:4, top: 2, right: 2}, stroke:"black"});
var unselectedControlSkin = new Skin({fill: green, borders:{bottom:4, top: 2}, stroke:"black"});

var unselectedStyle = new Style({color: "white", font: "20px Lucinda Grande"})
var selectedStyle = new Style({color: "white", font: "bold 28px Lucinda Grande"})

var tintRightBorderSkin = new Skin({fill: red, borders:{right:2, bottom: 4, top: 2}, stroke:"black"});
var imagesRightBorderSkin = new Skin({fill: blue, borders:{right:2, bottom: 4, top: 2}, stroke:"black"});
var controlRightBorderSkin = new Skin({fill: green, borders:{right:2, bottom: 4, top: 2}, stroke:"black"});


var addImageSkin = new Skin({fill: darkBlue, borders:{left:1, right:1, top:1, bottom: 1}, stroke:"black"});

    
EditPage.prototype.activateTab = function (tab) {

	this.tabContainers["control"].skin = unselectedControlSkin;
	this.tabContainers["images"].skin = unselectedImagesSkin;
	this.tabContainers["tint"].skin = unselectedTintSkin;
	
	this.tabContainers["control"].first.style = unselectedStyle;
	this.tabContainers["images"].first.style = unselectedStyle;
	this.tabContainers["tint"].first.style = unselectedStyle;

    this.controlContainer.remove(this.controls[this.currentTab]);
    this.currentTab = tab;
    this.controlContainer.add(this.controls[this.currentTab]);
    
    if (this.currentTab == "tint"){
		this.tabContainers[this.currentTab].skin = tintSelectedSkin;  
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.tabContainers["images"].skin = unselectedImagesSkin;
		this.container.skin = tintContainerSkin;
		this.controlContainer.skin = tintContainerSkin;
    } if (this.currentTab == "images"){
		this.tabContainers[this.currentTab].skin = imagesSelectedSkin;  
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.container.skin = imagesContainerSkin;
		this.controlContainer.skin = imagesContainerSkin;
    } else if (this.currentTab == "control"){
		this.tabContainers[this.currentTab].skin = controlSelectedSkin;
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.tabContainers["tint"].skin = unselectedTintSkin;
		this.container.skin = controlContainerSkin;
		this.controlContainer.skin = controlContainerSkin;
		
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
        skin: unselectedImagesSkin,
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
                style: new Style({color: "white", font: "Lucinda Grande"}),
                string: "Add Image"
            })
        ]
    };});

    var ControlTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,

        skin: unselectedControlSkin,
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
        skin: tintContainerSkin,
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
                style: new Style({color: "black", font: "Lucinda Grande"}),
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
                style: new Style({color: "black", font: "Lucinda Grande"}),
                string: "Cancel"
            })
        ]
    };});

    var ClearButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: clearButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                //this.window.tint = 0;
                this.window.images = []
                this.window.controls = null;
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "black", font: "Lucinda Grande"}),
                string: "Clear"
            })
        ]
    };});
    

    page.tabContainers.tint = new TintTab();
    page.tabContainers.images = new ImagesTab();
    page.tabContainers.control = new ControlTab();

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: tintContainerSkin,
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
