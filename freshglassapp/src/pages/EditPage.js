//@module
var NavBar = require("lib/NavBar");
var WindowSelector = require("lib/WindowSelector");

var CameraRoll = require("pages/CameraRoll");
var SLIDERS = require('controls/sliders');
var Window = require('lib/Window');

var EditPage = function (window, switchPages) {
    this.window = window;
    this.window.editPage = this;

    this.name = "edit";
    //this.previousPage = previousPage;
    this.switchPages = switchPages;
    
    this.lastAction = "";
    
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
    };

    this.undoAutoLine = null;
    this.tintCheckbox = null;
    //this.windowCopy = this.window;
};

EditPage.prototype.getMainWindow = function () {
    return this.window;
};

EditPage.prototype.onNavigatedTo = function () {
    // if we already rendered the kinoma structure for this page, make sure that we
    // still have the window preview here, because it may have been removed to get
    // put on another page
    if (this.container) {
        this.windowPreviewContainer.empty();
        this.windowPreviewContainer.add(this.window.renderPreview());
    }
};

var red = "#db3a1c";
var blue = "#4682EA";
var yellow = "#FDBA35";
var orange = "#FF7F00";
var green = "#67AF4B";
var purple = "#AF6DC5";
var darkBlue = "#43489B";

var applyButtonSkin = new Skin({fill: green, stroke:"black"});
var cancelButtonSkin = new Skin({fill: orange, stroke:"black"});
var clearButtonSkin = new Skin({fill: blue, stroke:"black"});
var undoButtonSkin = new Skin({fill:blue , stroke:"white"});

var tran = new Skin({fill: "white"});

var controluri = mergeURI(application.url, "images/controlbutton.png");
var controlwithlabeluri = mergeURI(application.url, "images/controlbuttonwithlabel.png");

var lefturi = mergeURI(application.url, "images/leftbutton.png");
var righturi = mergeURI(application.url, "images/rightbutton.png");
var upuri = mergeURI(application.url, "images/upbutton.png");
var downuri = mergeURI(application.url, "images/downbutton.png");

var imagesSkin = new Skin({fill: blue, borders:{bottom:2, right:1}, stroke: "gray"});
var controlSkin = new Skin({fill: green, borders:{bottom:2}, stroke:"gray"});

var rootContainterSkin = new Skin({fill: "white"});
var tintContainerSkin = new Skin({fill: "white"});
var imagesContainerSkin = new Skin({fill: "white"});
var controlContainerSkin = new Skin({fill: "white"});

var tintSelectedSkin = new Skin({fill: "white", borders:{right:2, top:2}, stroke:"gray"});
var imagesSelectedSkin = new Skin({fill: "white", borders:{left:1, right:2, top:2}, stroke:"gray"});
var controlSelectedSkin = new Skin({fill: "white", borders:{left:1, top:2}, stroke:"gray"});

var unselectedTintSkin = new Skin({fill: "white", borders:{bottom:2, top: 1, right: 1}, stroke:"gray"});
var unselectedImagesSkin = new Skin({fill: "white", borders:{bottom:2, top: 1, right: 1}, stroke:"gray"});
var unselectedControlSkin = new Skin({fill: "white", borders:{bottom:2, top: 1}, stroke:"gray"});

var unselectedStyle = new Style({color: "gray", font: "20px Lucinda Grande"});
var controlLabelStyle = new Style({color: "gray", font: "14px Lucinda Grande"});

var selectedStyle = new Style({color: blue, font: "bold 20px Lucinda Grande"});

var tintRightBorderSkin = new Skin({fill: "white", borders:{right:1, bottom: 2, top: 1}, stroke:"gray"});
var imagesRightBorderSkin = new Skin({fill: "white", borders:{right:1, bottom: 2, top: 1}, stroke:"gray"});
var controlRightBorderSkin = new Skin({fill: "white", borders:{right:1, bottom: 2, top: 1}, stroke:"gray"});

var addImageSkin = new Skin({fill:blue});

    
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

    var navBar = new NavBar({ page: page });
    var windowSelector = new WindowSelector({edit: true, presets: false, status: false, page: page, name: page.window.name });

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
        ]
    };});

    var TintSlider = SLIDERS.HorizontalSlider.template(function($){ return {
        left: 0, right: 0, top: 0, bottom: 0,
        behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
            onCreate: { value : function(container) {
                this.data = {min:0, max:1, value: page.window.tint};
            }},
            onValueChanged: { value: function(container) {
                SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
                if (!page.window.autoTint) {
                    page.window.tint = this.data.value;
                    // the false on the next line is to tell it to not update the images, because if
                    // we did that, they would flicker
                    page.window.updatePreview(false);
                    page.lastAction = "tint";
                    page.window.updateFrom(page.window);
                }
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
                page.window.clearImages = false;
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
        left: 15, right: 0, top: 0, height: 70,
        skin: controlContainerSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                if (page.controlID !== null) {
                    // do nothing
                } else {
                    page.controlID = page.window.addImage(controluri, 130, 130, 25, 25);
                    //trace(page.controlID + "\n");
                    page.window.clearImages = false;
                }
            }}
        }),
        contents: [
            new Picture({left: 0, top:0, width: 100, height:50, url: controlwithlabeluri}),
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


    // var ApplyButton = BUTTONS.Button.template(function ($) { return {
    //     left: 10, right: 5, top: 0, height: 35,
    //     skin: applyButtonSkin,
    //     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    //         onTap: { value: function (button) {
    //             page.window.updateFrom(page.window);
    //             page.window.updatePreview();
    //         }}
    //     }),
    //     contents: [
    //         new Label({
    //             left: 0, right: 0, bottom: 0, top: 0,
    //             style: new Style({color: "white", font: "Helvetica Neue", size: 18}),
    //             string: "Apply"
    //         })
    //     ]
    // };});

    // var CancelButton = BUTTONS.Button.template(function ($) { return {
    //     left: 5, right: 10, top: 0, height: 35,
    //     skin: cancelButtonSkin,
    //     behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
    //         onTap: { value: function (button) {
    //             trace(page.lastAction)
    //             if (page.lastAction == "tint"){
    //                 page.controls.tint.behavior.data.value = page.window.tint;
    //                 page.controls.tint.behavior.onValueChanged();
    //                 page.controls.tint.behavior.onLayoutChanged(page.controls.tint);
    //             } else if (page.lastAction == "control"){                
    //                 page.window.images = [];
    //                 page.window.clearImages = true;
    //                 //page.window.control.added = false;
    //             } else if (page.lastAction == "images"){
    //                 page.window.images.pop(page.window.images.length - 1);
    //             }
    //             page.window.updatePreview();
    //         }}
    //     }),
    //     contents: [
    //         new Label({
    //             left: 0, right: 0, bottom: 0, top: 0,
    //             style: new Style({color: "white", font: "Helvetica Neue", size: 18}),
    //             string: "Cancel"
    //         })
    //     ]
    // };});


    var ClearButton = BUTTONS.Button.template(function ($) { return {
        right: 15, height: 30, width: 70,
        skin: clearButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.controls.tint.behavior.data.value = 0;
                page.window.tint = 0;
                page.window.images = [];
                page.window.controls = null;
                //page.window.control.added = false;
                page.controls.tint.behavior.onValueChanged();
                page.controls.tint.behavior.onLayoutChanged(page.controls.tint);
                page.controlID = null;
                page.window.updatePreview();

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

    var UndoButton = BUTTONS.Button.template(function ($) { return {
        right: 10, height: 30, width: 70,
        skin: undoButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace(page.lastAction + "\n");
                if (page.lastAction == "tint") {
                    page.controls.tint.behavior.data.value = page.window.tint;
                    page.controls.tint.behavior.onValueChanged();
                    page.controls.tint.behavior.onLayoutChanged(page.controls.tint);
                } else if (page.lastAction == "control") {
                    page.window.images = [];
                    page.window.clearImages = true;
                    //page.window.control.added = false;
                } else if (page.lastAction == "images"){
                    page.window.images.pop(page.window.images.length - 1);
                }
                page.window.updatePreview();
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", size: 18, font: "Helvetica Neue"}),
                string: "Undo"
            })
        ]
    };});
    page.tabContainers.tint = new TintTab();
    page.tabContainers.images = new ImagesTab();
    page.tabContainers.control = new ControlTab();

    page.windowPreviewContainer = new Container({
        left: 0, right: 0, top: 0, bottom: 0,
        contents: [
            page.window.renderPreview(),
        ]
    });

    var autoTintCheckbox = BUTTONS.Checkbox.template(function($) { return {
        top:0, bottom:0, left:5,
        behavior: Object.create(BUTTONS.CheckboxBehavior.prototype, {
            onSelected: { value:  function(checkBox){
                autoTintCheckboxContainer.first.next.style = new Style({color: "blue", size: 18, font: "Helvetica Neue"});
                page.window.autoTint = true;
                application.invoke(new Message("/updateFirst"));
            }},
            onUnselected: { value:  function(checkBox){
                autoTintCheckboxContainer.first.next.style = new Style({color: "black", size: 18, font: "Helvetica Neue"});
                page.window.autoTint = false;
            }}
        })
    }});


    Handler.bind("/updateFirst", Behavior({
        onInvoke: function(handler, message){
            if (page.window.autoTint) {
                page.window.updatePreview(false);
                page.controls.tint.behavior.data.value = page.window.tint;
                page.controls.tint.behavior.onLayoutChanged(page.controls.tint);
                handler.invoke(new Message("/updateSecond"));
            }  
        },
    }));

    Handler.bind("/updateSecond", {
        onInvoke: function(handler, message){
            handler.wait(100);
        },
        onComplete: function(handler, message){
            handler.invoke(new Message("/updateFirst"));
        }
    });

    var autoTintCheckboxContainer = new Line({
        left: 0, right: 0, width: 100,
        contents: [
            new autoTintCheckbox(),
            new Label({
                left: 0,
                style: new Style({color: "Black", size: 18, font: "Helvetica Neue"}),
                string: "Auto-Tint"
            })
        ]    
    });

    page.tintCheckbox = autoTintCheckboxContainer;

    page.undoAutoLine = new Line({
        left: 0, right: 0, height: 45,
        contents: [
            page.tintCheckbox,
            new ClearButton(),
            new UndoButton(),
        ]
        });

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: tintContainerSkin,
        contents: [
            windowSelector,
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
            page.undoAutoLine,
            navBar,
        ]
    });

    rootContainter = new Container({
        top:0, bottom: 0, left: 0, right: 0, 
        skin: rootContainterSkin,
        contents: [ 
            rootColumn
        ]
    });

    this.container = rootContainter;
    return this.container;
};

module.exports = EditPage;