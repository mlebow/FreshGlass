//@module
var NavBar = require("lib/NavBar");
var CameraRoll = require("pages/CameraRoll");
var SLIDERS = require('controls/sliders');
var Window = require('lib/Window');

var EditPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
    this.windowPreviewContainer = null;
    this.currentTab = "tint";
    this.controlID = null;
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
    this.directional = {
    	tint: null, 
    	images: null, 
    	control: null
    }

    this.windowCopy = this.window.clone();
};

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "#AF6DC5";
var darkBlue = "#43489B";

var applyButtonSkin = new Skin({fill: green, stroke:"black"});
var cancelButtonSkin = new Skin({fill: blue, stroke:"black"});
var clearButtonSkin = new Skin({fill: red, stroke:"black"});

var tran = new Skin({fill: "#43489B"});

var controluri = mergeURI(application.url, "images/controlbutton.png");
var controlwithlabeluri = mergeURI(application.url, "images/controlbuttonwithlabel.png");

var lefturi = mergeURI(application.url, "images/leftbutton.png");
var righturi = mergeURI(application.url, "images/rightbutton.png");
var upuri = mergeURI(application.url, "images/upbutton.png");
var downuri = mergeURI(application.url, "images/downbutton.png");

var imagesSkin = new Skin({fill: blue, borders:{bottom:4, right:2}, stroke: "black"});
var controlSkin = new Skin({fill: green, borders:{bottom:4}, stroke:"black"});

var tintContainerSkin = new Skin({fill: "#dddddd"});
var imagesContainerSkin = new Skin({fill: "#dddddd"});
var controlContainerSkin = new Skin({fill: "#dddddd"});

var tintSelectedSkin = new Skin({fill: blue, borders:{right:4, top:4}, stroke:"black"});
var imagesSelectedSkin = new Skin({fill: green, borders:{left:2, right:4, top:4}, stroke:"black"});
var controlSelectedSkin = new Skin({fill: red, borders:{left:2, top:4}, stroke:"black"});

var unselectedTintSkin = new Skin({fill: blue, borders:{bottom:4, top: 2, right: 2}, stroke:"black"});
var unselectedImagesSkin = new Skin({fill: green, borders:{bottom:4, top: 2, right: 2}, stroke:"black"});
var unselectedControlSkin = new Skin({fill: red, borders:{bottom:4, top: 2}, stroke:"black"});

var unselectedStyle = new Style({color: "white", font: "20px Lucinda Grande"});
var controlLabelStyle = new Style({color: "black", font: "14px Lucinda Grande"});

var selectedStyle = new Style({color: "white", font: "bold 28px Lucinda Grande"});

var tintRightBorderSkin = new Skin({fill: blue, borders:{right:2, bottom: 4, top: 2}, stroke:"black"});
var imagesRightBorderSkin = new Skin({fill: green, borders:{right:2, bottom: 4, top: 2}, stroke:"black"});
var controlRightBorderSkin = new Skin({fill: red, borders:{right:2, bottom: 4, top: 2}, stroke:"black"});

var addImageSkin = new Skin({fill: darkBlue});

    
EditPage.prototype.activateTab = function (tab) {

	this.tabContainers["control"].skin = unselectedControlSkin;
	this.tabContainers["images"].skin = unselectedImagesSkin;
	this.tabContainers["tint"].skin = unselectedTintSkin;
	
	this.tabContainers["control"].first.style = unselectedStyle;
	this.tabContainers["images"].first.style = unselectedStyle;
	this.tabContainers["tint"].first.style = unselectedStyle;

	//if (this.currentTab != "tint"){
    //	this.controlContainer.remove(this.directional[this.currentTab]);
    //}

    this.controlContainer.remove(this.controls[this.currentTab]);
    
    this.currentTab = tab;
    
    this.controlContainer.add(this.controls[this.currentTab]);
    
    if (this.currentTab == "tint") {
		this.tabContainers[this.currentTab].skin = tintSelectedSkin;
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.tabContainers["images"].skin = unselectedImagesSkin;
		this.container.skin = tintContainerSkin;
		this.controlContainer.skin = tintContainerSkin;
		
    } else if (this.currentTab == "images") {
		this.tabContainers[this.currentTab].skin = imagesSelectedSkin;
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.container.skin = imagesContainerSkin;
		this.controlContainer.skin = imagesContainerSkin;\
    	//this.controlContainer.add(this.directional[this.currentTab]);
		
    } else if (this.currentTab == "control"){
		this.tabContainers[this.currentTab].skin = controlSelectedSkin;
		this.tabContainers[this.currentTab].first.style = selectedStyle;
		this.tabContainers["tint"].skin = unselectedTintSkin;
		this.container.skin = controlContainerSkin;
		this.controlContainer.skin = controlContainerSkin;
		//this.controlContainer.add(this.directional[this.currentTab]);
		
    }
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
EditPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var navBar = new NavBar({ name: page.window.name, back: true, home: false, borders: false, page: page });

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
            }), 
            //applyIcon
        ]
    };});

    var TintSlider = SLIDERS.HorizontalSlider.template(function($){ return{
        left: 0, right: 0, top: 0, bottom: 0, 
        behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
            onCreate: { value : function(container) {
                this.data = {min:0, max:1, value: page.window.tint};
            }},
            onValueChanged: { value: function(container) {
                SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
                page.windowCopy.tint = this.data.value;
                page.windowCopy.updatePreview();
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
        left: 10, width: 100, top: 10, bottom: 5,
        skin: addImageSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                var cameraRoll = new CameraRoll($.window, page, page.switchPages);
                page.switchPages(cameraRoll);
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", font: "Lucinda Grande"}),
                string: "Add Image",
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
            }), 
        ]
    };});   
      
     var controlButton = BUTTONS.Button.template(function ($) { return {
        left: 25, right: 0, top: 10, height: 80,
        skin: controlContainerSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
            	if (page.controlID != null){}
            	else {
	                page.controlID = page.windowCopy.addImage(controluri, 130, 130, 25, 25);		
	                trace(page.controlID);	
                }	
            }}
        }),
        contents: [
        	new Picture({right: 0, left: 0, width: 100, height:50, url: controlwithlabeluri}),
        ]
    };});
    
    var leftButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, height: 80,
        skin: tran,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                // does nothing for now				
            }}
        }),
        contents: [
        	new Picture({right: 0, left: 0, width: 50, height:50, url: lefturi}),
        ]
    };});
    
    var rightButton = BUTTONS.Button.template(function ($) { return {
        left: 10, right: 0, top: 10, height: 10,
        skin: tran,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                // does nothing for now				
            }}
        }),
        contents: [
        	new Picture({right: 0, left: 0, width: 50, height:50, url: righturi}),
        ]
    };});    
    
    var upButton = BUTTONS.Button.template(function ($) { return {
        left: 250, right: 50, top: 0, height: 15,
        skin: tran,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                // does nothing for now				
            }}
        }),
        contents: [
        	new Picture({right: 0, left: 0, width: 10, height:10, url: upuri}),
        ]
    };});
    
    var downButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 10, height: 10,
        skin: tran,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                // does nothing for now				
            }}
        }),
        contents: [
        	new Picture({right: 0, left: 0, width: 50, height:50, url: upuri}),
        ]
    };});  
          
    page.controls.tint = new TintSlider();
    page.controls.images = new AddImageButton(page); //TODO: change!
    page.controls.control = new controlButton(); //TODO: change!


    page.controlContainer = new Container({
        left: 0, right: 0, height: 50,
        skin: tintContainerSkin,
        contents: [
            page.controls.tint
        ],
    });
    

    var ApplyButton = BUTTONS.Button.template(function ($) { return {
        left: 10, right: 5, top: 0, height: 35,
        skin: applyButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.window.updateFrom(page.windowCopy);
                page.window.updatePreview();
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", font: "Helvetica Neue", size: 18}),
                string: "Apply"
            })
        ]
    };});

    var CancelButton = BUTTONS.Button.template(function ($) { return {
        left: 5, right: 10, top: 0, height: 35,
        skin: cancelButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.controls.tint.behavior.data.value = page.window.tint;
                page.controls.tint.behavior.onValueChanged();
                page.controls.tint.behavior.onLayoutChanged(page.controls.tint);
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", font: "Helvetica Neue", size: 18}),
                string: "Cancel"
            })
        ]
    };});

    var ClearButton = BUTTONS.Button.template(function ($) { return {
        left: 10, right: 10, top: 0, height: 35,
        skin: clearButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.controls.tint.behavior.data.value = 0;
                page.windowCopy.tint = 0;
                page.windowCopy.images = [];
                page.windowCopy.controls = null;
                page.controls.tint.behavior.onValueChanged();
                page.controls.tint.behavior.onLayoutChanged(page.controls.tint);
                page.controlID = null;
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", font: "Helvetica Neue", size: 18}),
                string: "Clear"
            })
        ]
    };});

    page.tabContainers.tint = new TintTab();
    page.tabContainers.images = new ImagesTab();
    page.tabContainers.control = new ControlTab();
    
    var directionalImages = new Container({
        left: 0, right: 0, height: 50,
        skin: tintContainerSkin,
        contents: [
            new upButton(),
        ],
    });
    
    var directionalControl = new Container({
        left: 200, right: 200, bottom: 0, top: 0, height: 20,
        skin: tintContainerSkin,
        contents: [
            new upButton(),
            //new downButton(), 
            //new rightButton(), 
            //new leftButton(),
        ],
    });
    
    page.directional.tint = null;
    page.directional.images = directionalImages;
    page.directional.control = directionalControl;
    
    page.windowPreviewContainer = new Container({
        left: 0, right: 0, top: 0, bottom: 0,
        contents: [
            page.windowCopy.renderPreview(),
        ]
    });

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: tintContainerSkin,
        contents: [
            navBar,
            new Line({
                left: 0, right: 0, height: 45,
                contents: [
                    page.tabContainers.tint,
                    page.tabContainers.images,
                    page.tabContainers.control
                ]
            }),
            page.controlContainer,
            page.windowPreviewContainer,
            new Line({
                left: 0, right: 0, height: 45,
                contents: [
                    new ApplyButton(),
                    new CancelButton()
                ]
            }),
            new Line({
                left: 0, right: 0, height: 45,
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