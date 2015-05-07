//@module
var THEME = require('themes/flat/theme'); // required for BUTTONS to work???
var BUTTONS = require("controls/buttons");
var Window = require('lib/Window');

var EditPage = require("pages/EditPage");
var NavBar = require("lib/NavBar");
var WindowSelector = require("lib/WindowSelector");

//why do we have this? 
/*
var StatusPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
}
*/

var StatusPage = function (window, switchPages) {
    this.window = window;
    //this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
    this.temperatureLabel = null;
    this.brightnessLabel = null;

    this.name = "status";

    this.windowPreviewContainer = null; // kinoma container for window preview
    this.window.statusPage = this;
};

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "#AF6DC5";
var darkBlue = "#43489B";

var sunURL = mergeURI(application.url, "images/sunpicture.png");
var thermURL = mergeURI(application.url, "images/thermometer.png");

StatusPage.prototype.onNavigatedTo = function () {
    // if we already rendered the kinoma structure for this page, make sure that we
    // still have the window preview here, because it may have been removed to get
    // put on another page
    if (this.container) {
        this.windowPreviewContainer.empty();
        this.windowPreviewContainer.add(this.window.renderPreview());
    }
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
StatusPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var navBar = new NavBar( {selected: page.window.name, status: true, edit: false, presets: false, home: false, borders: true, page: page,});
    var windowSelector = new WindowSelector({status:true, presets: false, edit: false, page: page, name: page.window.name});

    this.sunIcon = new Picture({width: 50, height: 55, left: 190, url: sunURL});
    this.thermometer = new Picture({width: 50, height: 55, right: 190, url: thermURL});

    this.temperatureLabel = new Label({
        left: 40, right: 0, top: 0, bottom: 0,
        style: new Style({color: "black", font: "25px Helvetica Neue"}),
        string: page.window.temperature + "°F"
    });

    this.brightnessLabel = new Label({
        left: 0, right: 40, top: 0, bottom: 0,
        style: new Style({color: "black", font: "25px Helvetica Neue"}),
        string: page.window.brightness + "%"
    });

    var statusLine = new Line({
        left: 0, right: 0, height: 55,
        contents: [page.temperatureLabel, page.brightnessLabel]

    });

    var SavePresetButton = BUTTONS.Button.template(function ($) { return {
        left: 200, right: 10, bottom: 10, top:10, //height: 35,
        skin: new Skin({fill: blue, stroke:"black"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                
                trace("This does nothing right now.\n");
                presetsPage.addToPresetsPage(page.window);
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", size: 18, font: "Helvetica Neue"}),
                string: "Save as Preset"
            })
        ]
    };});

    page.windowPreviewContainer = new Container({
        left: 0, right: 0, top: 15, bottom: 0,
        contents: [
            page.window.renderPreview(),
        ]
    });

    var statusContainer = new Container({
        top: 0, left: 0, right: 0, height: 80,
        contents: [
           this.sunIcon,
           this.thermometer,
           statusLine,
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
                    new SavePresetButton()
                ]
            }),
           navBar,
        ]
    });

    this.container = rootColumn;
    return this.container; // TODO: implement
};

StatusPage.prototype.updateContainerWithData = function() {
    if (this.container !== null) {
        this.temperatureLabel.string = this.window.temperature + "\u00B0 F";
        this.brightnessLabel.string = this.window.brightness + "%";
    }
};

module.exports = StatusPage;
