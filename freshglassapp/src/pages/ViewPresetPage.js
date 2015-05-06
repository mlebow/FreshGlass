/*
//@module
var THEME = require('themes/flat/theme');
var BUTTONS = require("controls/buttons");
var Window = require('lib/Window');

var TitleBar = require("lib/TitleBar");
var NavBar = require("lib/NavBar");

var ViewPresetPage = function (preset, presetsPage, switchPages) {
    this.preset = preset;
    this.switchPages = switchPages;
    this.container = null;
    this.name = "viewPreset";
    this.presetsPage = presetsPage
    
    this.presetPreviewContainer = null; // kinoma container for window preview
    this.preset.statusPage = this;
};

var red = "#DB4C3F";
var blue = "#4682EA";

ViewPresetPage.prototype.onNavigatedTo = function () {
    // if we already rendered the kinoma structure for this page, make sure that we
    // still have the window preview here, because it may have been removed to get
    // put on another page
    if (this.container) {
        this.presetPreviewContainer.empty();
        this.presetPreviewContainer.add(this.preset.renderPreview());
    }
};


/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
 
 /*
ViewPreviewPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var navBar = new NavBar( {selected: null, status: false, edit: false, presets: true, home: false, borders: true, page: page});
    var titleBar = new TitleBar({name: page.preset.name, back: false, home: true, borders: true, page: page});

    this.windowsLabel = new Label({
        left: 40, right: 0, top: 0, bottom: 0,
        style: new Style({color: "black", font: "20px Helvetica Neue"}),
        string: "Preset for: " + page.preset.getWindowsNames(),
    });
    
    var ApplyButton = BUTTONS.Button.template(function ($) { return {
        left: 10, width: 50, top: 0, height: 25,
        skin: buttonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                for(var i = 0; i < page.selectedPreset.windows.length; i++){
                    page.selectedPreset.window[i] = page.selectedPreset;
                }
                // after applying the preset, go to the status page of the
                // first window that the preset corresponds to
                page.switchPages(page.statusPages[page.preset.windowList[0]]);
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
        left: 10, width:50, top: 0, height: 25,
        skin: buttonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.presetsPage.rootColumn.remove(page.preset);
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
       		windowSelector,
			statusContainer,
            page.windowPreviewContainer,
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

ViewPage.prototype.applyPreset = function() {

};

module.exports = ViewPresetPage;
*/
