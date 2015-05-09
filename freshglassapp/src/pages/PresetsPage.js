var THEME = require('themes/flat/theme'); 
var BUTTONS = require("controls/buttons");

var TitleBar = require("lib/TitleBar");
var NavBar = require("lib/NavBar");
var Window = require('lib/Window');
var Preset = require('lib/Preset');

var ViewPresetPage = require('pages/ViewPresetPage');

/**
 * @param {Window List} windows  list of windows part of the app
 */
var PresetsPage = function (windows, switchPages) {
    this.windows = windows;    
    this.switchPages = switchPages;
    this.container = null;
    var valImg ={ url: valentineURL, height: 250, width: 200, x: 30, y: 10};
    var calImg ={ url: calURL, height: 250, width: 200, x: 40, y: 20};
     
    this.presets = [
        new Preset("Valentine's Day", [this.windows[2]], [valImg]),
        new Preset("Go Bears!", this.windows.slice(0,1), [calImg]),
    ];
    
    this.name = "presets";
    this.selectedPreset = null;
    this.navBar = new NavBar({selected: null, edit: false, status: false, presets: true, home: false, borders: true, page: this});
	
	
	this.displayLine = new Line({ 
		top:0, left: 0, right: 0, height: 250, name:"displayLine", 
		contents:[
            //valPreset,
            //calPreset,
        ],});
};

var red = "#DB4C3F";
var blue = "#4682EA";
var lightGray = "#fafafa";

var rootSkin = new Skin({fill: "white"}); 

var buttonSkin = new Skin({fill: blue, stroke:"white"});
var presetSkin = new Skin({fill: lightGray, stroke:"black"});

var transparentSkin = new Skin({borders:{bottom:2, top:2, left:2, right:2}, opacity: .001});
var presetTitleSkin = new Skin({fill: "white", opacity: .01});

var labelStyle = new Style({ color: 'black', font: "10px Georgia", horizontal: 'center', vertical: 'middle', });


//Globals
var valentineURL = mergeURI(application.url, "./images/valentinePreset.png");
var calURL = mergeURI(application.url, "./images/calPreset.png");

var preview = null;
var presetCoordinates = {1:(20, 20), 2: (20, 0)} //{presetCount: (top, left)} top, left of the displayed presetPreview on the page
var number = 1;


var PresetPreview = BUTTONS.Button.template(function ($) { return {
    left: 5, width: Preset.PREVIEW_WIDTH, top: 20, height: Preset.PREVIEW_HEIGHT,
    skin: presetSkin,
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function (button) {
            presetsPage.selectedPreset = $.preset;// :/
            trace("viewPresetPage in the works\n");
            
            var viewPreset = new ViewPresetPage($.preset, presetsPage, presetsPage.switchPages);
            presetsPage.switchPages(viewPreset);
        }}
    }),
    contents: [
        new Picture({left:0, right:0, top:0, bottom: 0, url: $.url,}), 
        new Label({
                left: 0, right: 0, bottom:0, height:15,
                style: new Style({color: "black", font:"10px"}),
                string: $.presetName, 
                skin: new Skin({color:"red"}),
            }),
    ]
};});

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
PresetsPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var titleBar = new TitleBar({name:"Presets", back: false, home: true, borders: true, page: page});
    
    var AddPresetButton = BUTTONS.Button.template(function ($) { return {
        left: 5, width: Preset.PREVIEW_WIDTH, top: 20, height: Preset.PREVIEW_HEIGHT,
        skin: new Skin({fill:"white",}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
				trace("add preset does nothing\n");
            }}
        }),
        contents: [
            new Label({
                    left: 0, right: 0, top:0, bottom:0,
                    style: new Style({color: "black", font:" bold 30px"}),
                    skin: presetSkin,
                    string: "+", 
                }),
        ]
    };});

    var valPreset = new PresetPreview({
        preset: page.presets[0],
        presetName: page.presets[0].name,
        url:valentineURL,
    });
    
    var calPreset = new PresetPreview({
        preset: page.presets[1],
        presetName: page.presets[1].name,
        url:calURL,
    });
    
    page.displayLine.add(valPreset);
    page.displayLine.add(calPreset);

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: rootSkin,
        contents: [
            titleBar,
            new Container({
                name:"presets", top: 0, left: 0, bottom: 0, right: 0, 
                skin: rootSkin,
                contents:[page.displayLine],

        }),
        page.navBar,
        ],
    });
    this.container = rootColumn;
    return this.container; 
};

PresetsPage.prototype.addToPresetsPage = function(window) {
    var newPreset = new Preset("Open!", [window], window.images)
    this.presets.push(newPreset);
    trace(newPreset.images[0]);
    var newPresetPreview = new PresetPreview({
        preset: newPreset,
        presetName: newPreset.name,
        url: newPreset.images[0],
    });
    trace("addToPresetsPage doesn't work");
/*
    this.displayLine = new Line({ 
		top:0, left: 0, right: 0, height: 250, name:"displayLine", 
		contents:[
            valPreset,
            calPreset,
            newPresetPreview,
        ],});
      */
}

module.exports = PresetsPage;
