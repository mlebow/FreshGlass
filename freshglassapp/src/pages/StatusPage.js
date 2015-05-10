//@module
var THEME = require('themes/flat/theme');
var BUTTONS = require("controls/buttons");
var Window = require('lib/Window');

var EditPage = require("pages/EditPage");
var NavBar = require("lib/NavBar");
var WindowSelector = require("lib/WindowSelector");

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "#AF6DC5";
var darkBlue = "#43489B";

var rootContainterSkin = new Skin({fill: "white"});

var sunURL = mergeURI(application.url, "images/suns/Sun0.png");
var thermURL = mergeURI(application.url, "images/thermometers/Thermometer0.png");

/**
 * Initialize status page.
 * @param {Object} window - the global window object representing the window preview we are working on
 * @param {function} switchPages - the function used to switch pages
 */
var StatusPage = function (window, switchPages) {
    this.window = window;
    this.window.statusPage = this;
    this.switchPages = switchPages;
    this.container = null;
    this.temperatureLabel = null;
    this.brightnessLabel = null;

    this.name = "status";

    this.windowPreviewContainer = null; // kinoma container for window preview
};

/**
 * Returns the main window.
 * @return - Window object
 */
StatusPage.prototype.getMainWindow = function () {
    return this.window;
};

/**
 * Clean up preview after navigation.
 */
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

    var navBar = new NavBar({ page: page });
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
        left: 200, right: 10, bottom: 10, top:10,
        skin: new Skin({fill: blue, stroke:"black"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                presetsPage.addToPresetsPage(page.window);
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white", size: 16, font: "Helvetica Neue"}),
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

/**
 * Update the sensor icons with data from the device.
 */
StatusPage.prototype.updateContainerWithData = function() {
    if (this.container !== null) {
        this.temperatureLabel.string = this.window.temperature + "\u00B0 F";
        this.brightnessLabel.string = this.window.brightness + "%";
        sunPicNumber = Math.floor(this.window.brightness / 10);
        sunURL = mergeURI(application.url, "images/suns/Sun" + sunPicNumber + ".png");
        if (sunURL != this.sunIcon.url){
            this.sunIcon.url = sunURL;
        }
        thermometerPicNumber = Math.floor(this.window.temperature / 10);
        thermURL = mergeURI(application.url, "images/thermometers/Thermometer" + thermometerPicNumber + ".png");
        if (thermURL != this.thermometer.url){
            this.thermometer.url = thermURL;
        }
    }
};

module.exports = StatusPage;