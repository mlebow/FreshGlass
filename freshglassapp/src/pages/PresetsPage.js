var THEME = require('themes/flat/theme'); 
var BUTTONS = require("controls/buttons");

var NavBar = require("lib/NavBar");
var Window = require('lib/Window');

var PresetsPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
    this.presets = [];
}    

var WindowSelector = require("lib/WindowSelector");
var Window = require('lib/Window');

var PresetsPage = function (window, switchPages) {
    this.window = window;

    if (this.window.name == "Window 1"){
	    this.previousPage = statusPage1;
    } if (this.window.name == "Window 2"){
	    this.previousPage = statusPage2;
    } if (this.window.name == "Window 3"){
	    this.previousPage = statusPage3;
    }
    
    this.switchPages = switchPages;
    this.container = null;
    this.presets = [];
    this.name = "presets";
    //this.windowCopy = this.window.clone();

};

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "#AF6DC5";
var lightGray = "#fafafa";

var rootSkin = new Skin({fill: "white"}); 

var applyButtonSkin = new Skin({fill: green, stroke:"black"});
var cancelButtonSkin = new Skin({fill: blue, stroke:"black"});
var deleteButtonSkin = new Skin({fill: red, stroke:"black"});
var addPresetSkin = new Skin({fill: lightGray, stroke:"black"});

var transparentSkin = new Skin({borders:{bottom:2, top:2, left:2, right:2}, opacity: .001});
var presetTitleSkin = new Skin({fill: "white", opacity: .01});

var presetWidth = 100;
var presetHeight = 100;

//Globals
var valentineURL = mergeURI(application.url, "./images/valentinePreset.png");
var preview = null;


/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
PresetsPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var navBar = new NavBar({ name: "Presets", presets: true, edit: false, status: false, home: false, borders: true, page: page, selected: page.window.name });
    var windowSelector = new WindowSelector({status:false, presets:true, edit: false, page: page, name: page.window.name});

 
    //need to make a preset constructor for v2. 
    //hard code for hi fi prototypeversion with picture & label

    var Preset = BUTTONS.Button.template(function ($) { return {
        left: 20, width: presetWidth, top: 20, height: presetHeight + 50,
        skin: new Skin({fill:"white",}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
            	preview = new Line({ top:0, left: 0, right: 0, bottom:0,
                    contents:[
                        new ViewPresetContainer({name:"preview"}),
                        ],
                    })
            	
                page.container.add(preview);
            }}
        }),
        contents: [
            new Picture({left:0, right:0, top:0, bottom: 0,url: valentineURL,}), 
            new Label({
                    left: 0, right: 0, top:155, height:15,
                    style: new Style({color: "black", font:"10px"}),
                    skin: presetTitleSkin,
                    string: "Valentine's Day", 
                }),
        ]
    };});

    var AddPresetButton = BUTTONS.Button.template(function ($) { return {
        left: 20, width: presetWidth, top: 20, height: presetHeight + 50,
        skin: new Skin({fill:"white",}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
               //sthh should happen here
            }}
        }),
        contents: [
            new Label({
                    left: 0, right: 0, top:0, bottom:0,
                    style: new Style({color: "black", font:" bold 30px"}),
                    skin: addPresetSkin,
                    string: "+", 
                }),
        ]
    };});

    var ViewPresetContainer = Container.template(function($) {return { 
        left: 0, right: 0, top: -270, bottom: 0, 
        skin: rootSkin,
        name:$.name, 
        contents:[
            new Line({ 
                top:0, left: 0, right: 0, height: 40,
                contents:[
                    new ApplyButton(), 
                    new CancelButton(), 
                    new DeleteButton(),
                ],
            }),
            new Picture({ top:40, height:300, width:300, url: valentineURL, opacity:.5, }), 
        ], 
    }}); 

    var ApplyButton = BUTTONS.Button.template(function ($) { return {
        left: 10, right: 0, top: 0, height: 35,
        skin: applyButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                //apply the image to the window;
                    var scale = .5;
                    var url = valentineURL;
                    var height = Window.PREVIEW_HEIGHT * scale;
                    var width = Window.PREVIEW_WIDTH * scale;
                    var startX = 0;
                    var startY = 0;
                    trace(url + " " + startX + " " + startY + " " + height + " " + width + "\n");
                    page.window.addImage(url, startX, startY, height, width);//hardcode 
                    page.switchPages(page.previousPage);
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
        left: 0, right: 0, top: 0, height: 35,
        skin: cancelButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.container.remove(preview);
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

    var DeleteButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 10, top: 0, height: 35,
        skin: deleteButtonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Delete does nothing right now\n");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", font: "Helvetica Neue", size: 18}),
                string: "Delete"
            })
        ]
    };});

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: rootSkin,
        contents: [
        windowSelector,
            new Container({
                name:"presetsLand", top: 0, left: 0, bottom: 0, right: 0, 
                skin: rootSkin,
                contents:[
                    new Line({ top:0, left: 0, right: 0, height: 250,
                    contents:[
                        new Preset(), 
                        new AddPresetButton(), ],
                    })
                ],

        }),
        navBar
        ],
    });
    this.container = rootColumn;
    return this.container; 
};

PresetsPage.prototype.newPreset = function() {
//make new preset
}

PresetsPage.prototype.updateWindowWithPreset = function() {
}

module.exports = PresetsPage;

