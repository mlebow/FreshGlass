var THEME = require('themes/flat/theme');
var BUTTONS = require("controls/buttons");
var Window = require('lib/Window');

var TitleBar = require("lib/TitleBar");
var NavBar = require("lib/NavBar");

var ViewPresetPage = function (preset, presetsPage, switchPages) {
    this.preset = preset;
    this.presetsPage = presetsPage;
    this.switchPages = switchPages;
    
    this.container = null;
    this.name = "viewPreset";
    
    this.previousPage = presetsPage;
  
    this.container = null;
    this.presetPreviewContainer = null; // kinoma container for window preview

};

ViewPresetPage.prototype.getMainWindow = function () {
    return this.presetsPage.windows[0];
};

var red = "#DB4C3F";
var blue = "#4682EA";
var lightGray = "#fafafa";

var buttonSkin = new Skin({fill: blue, stroke:"black"});
var presetSkin = new Skin({fill: lightGray, stroke:"black"});

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
ViewPresetPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var navBar = new NavBar({ page: page });
    var titleBar = new TitleBar({name: page.preset.name + "       ", back: true, home: true, borders: true, page: page });

    var windowsLabel = new Label({
        left: 0, right: 0, top: 0, height: 40,
        style: new Style({color: "black", font: "20px Helvetica Neue"}),
        string: "Preset for: " + page.preset.getWindowsNames(),
    });
    
    var ApplyButton = BUTTONS.Button.template(function ($) { return {
        left: 150, right:10, bottom: 10, top: 10,
        skin: buttonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                for(var i = 0; i < page.preset.windowList.length; i++){
                    page.applyPreset(page.preset, page.preset.windowList[i]);
                    trace("apply button pressed\n");
                }
                // after applying the preset, go to the status page of the
                // first window that the preset corresponds to
                // if(page.preset.windowList[0] == mainPage.windows[0]){
                //     page.switchPages(statusPage1);
                // } else if (page.preset.windowList[0] == mainPage.windows[0]){
                //     page.switchPages(statusPage2);
                // } else if (page.preset.windowList[0] == mainPage.windows[0]){
                //     page.switchPages(statusPage3);
                	
                // }                
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

    var DeleteButton = BUTTONS.Button.template(function ($) { return {
        left: 10, right:10, bottom: 10, top: 10,
        skin: buttonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("delete does nothing right now\n");
                //page.presetsPage.removePreset(page.preset);
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
    
    page.presetPreviewContainer = new Container({
        left: 0, right: 0, top: 15, bottom: 0,
        contents: [
            page.preset.renderPreview(),
        ]
    });

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "white"}),
        contents: [
       		titleBar,
			windowsLabel,
            page.presetPreviewContainer,
            new Line({
                left: 0, right: 0, height: 45,
                contents: [
                    new ApplyButton(), 
                    new DeleteButton()
                ]
            }),
           navBar,
        ]
    });

    this.container = rootColumn;
    return this.container;
};

ViewPresetPage.prototype.applyPreset = function(preset, window) {
    var index = mainPage.windows.indexOf(window);
    trace("index: before" + index + "\n");
    mainPage.windows[index].updateFrom(preset);
    //trace(mainPage.windows[index].images[0].url);
    // after update the window with preset, go to the status page of the
    // first window that the preset corresponds to
    this.switchPages(mainPage.windows[index].statusPage);
    window.updatePreview();
};

module.exports = ViewPresetPage;
