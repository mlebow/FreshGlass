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
    /*
    //don't need window?
    this.window = window;
    //do we care about previous page anymore? 
    if (this.window.name == "Window 1"){
	    this.previousPage = statusPage1;
    } if (this.window.name == "Window 2"){
	    this.previousPage = statusPage2;
    } if (this.window.name == "Window 3"){
	    this.previousPage = statusPage3;
    }
    */
    this.switchPages = switchPages;
    this.container = null;
    this.presets = [
        new Preset("Valentine's Day", [this.windows[2]], valentineURL),
        new Preset("Go Bears!", this.windows.slice(0,1), calURL),
    ];
    this.name = "presets";
    this.selectedPreset = null;
    this.navBar = new NavBar({selected: null, edit: false, status: false, presets: true, home: false, borders: true, page: this});
};

var red = "#DB4C3F";
var blue = "#4682EA";
var lightGray = "#fafafa";

var rootSkin = new Skin({fill: "white"}); 

var buttonSkin = new Skin({fill: blue, stroke:"white"});
var addPresetSkin = new Skin({fill: lightGray, stroke:"black"});

var transparentSkin = new Skin({borders:{bottom:2, top:2, left:2, right:2}, opacity: .001});
var presetTitleSkin = new Skin({fill: "white", opacity: .01});

var labelStyle = new Style({ color: 'black', font: "10px Georgia", horizontal: 'center', vertical: 'middle', });


//Globals
var valentineURL = mergeURI(application.url, "./images/valentinePreset.png");
var calURL = mergeURI(application.url, "./images/calPreset.png");

var preview = null;
var presetCoordinates = {1:(20, 20), 2: (20, 0)} //{presetCount: (top, left)} top, left of the displayed presetPreview on the page
var number = 1;
/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
PresetsPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var titleBar = new TitleBar({name:"Presets", back: false, home: true, borders: true, page: page});
    var PresetPreview = BUTTONS.Button.template(function ($) { return {
        left: 5, width: Preset.PREVIEW_WIDTH, top: 20, height: Preset.PREVIEW_HEIGHT,
        skin: addPresetSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.selectedPreset = $.preset;
                trace("viewPresetPage in the works\n");
                //var viewPreset = new ViewPresetPage($.preset, page, page.switchPages);
                //page.switchPages(viewPreset);
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
                    skin: addPresetSkin,
                    string: "+", 
                }),
        ]
    };});
    
    var ViewPresetContainer = Container.template(function($) {return { 
        left: 0, right: 0, top: -375, bottom: 100, 
        skin: addPresetSkin,
        name:$.name, 
        contents:[
            new Label({
                left: 0, right: 0, top:0, height:15,
                style: labelStyle,
                string: page.selectedPreset.name,
                skin: new Skin({fill:"green"}), 
            }), 
            new Label({
				left: 0, right: 0, top:15, height:15,
				style: labelStyle,
			    string: page.selectedPreset.getWindowsNames(), 
			}),
            new Picture({left:0, right:0, top:50, height:200, url: $.url,}), 
            new Line({ 
                top:0, left: 0, right: 0, bottom:45, top: 250, skin: new Skin({fill:"purple",}),
                contents:[
                    new ApplyButton(), 
                    new DeleteButton(),
                ],
            }),
            //page.navBar,
            ],
        
    }});

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

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: rootSkin,
        contents: [
        //windowSelector,
            titleBar,
            new Container({
                name:"presetsLand", top: 0, left: 0, bottom: 0, right: 0, 
                skin: rootSkin,
                contents:[
                    new Line({ top:0, left: 0, right: 0, height: 250,
                    contents:[
                        valPreset,
                        calPreset,
                        //new AddPresetButton(), 
                        ],
                    })
                ],

        }),
        page.navBar,
        ],
    });
    this.container = rootColumn;
    return this.container; 
};

PresetsPage.prototype.addToPresetsPage = function(window) {
    //add a fake window? 
    var newPreset = new Preset("Open!", window.name, window.images)
    this.presets.push(newPreset);
    this.rootColumn.add(newPreset);
}

module.exports = PresetsPage;
