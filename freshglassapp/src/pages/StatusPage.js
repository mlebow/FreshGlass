//@module
var THEME = require('themes/flat/theme'); // required for BUTTONS to work???
var BUTTONS = require("controls/buttons");

var EditPage = require("pages/EditPage");
var NavBar = require("lib/NavBar");

var StatusPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
    this.temperatureLabel = null;
    this.brightnessLabel = null;

    this.windowPreviewContainer = null; // kinoma container for window preview
    this.window.statusPage = this;
};

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "AF6DC5";
var darkBlue = "#43489B";

var sunIcon = new Picture({width: 150, height: 150, left: 165, url: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2012/08/09/5023fe9fc29e061d3f000005/medium_sun-big.png"});
var thermometer = new Picture({width: 140, height: 140, right: 165, url: "http://images.clipartpanda.com/heat-clipart-medical_red_thermometer_2.png"});

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

    // TODO: replace this with Michael's general header bar template
    var headerBar = new NavBar({ name: page.window.name, back: true, home: false, borders: true, page: page });

    this.temperatureLabel = new Label({
        left: 0, right: 0, height: 100,
        style: new Style({color: "black", font: "25px Georgia"}),
        string: page.window.temperature + " F"
    });

    this.brightnessLabel = new Label({
        left: 0, right: 0, height: 100,
        style: new Style({color: "black", font: "35px Georgia"}),
        string: (Math.floor(page.window.brightness * 100)) + "%"
    });
        
    var statusLine = new Line({
        left: 0, right: 0, height: 100,
        contents: [page.temperatureLabel, page.brightnessLabel]

    });

    var EditButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top:0, bottom: 0,
        skin: new Skin({fill: red, borders:{left:2, right:1, top:2, bottom:2}, stroke:"black"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                 var editPage = new EditPage($.window, page, page.switchPages);
                 page.switchPages(editPage);
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Edit"
            })
        ]
    };});

    var SavePresetButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top:0, bottom: 0,
        skin: new Skin({fill: blue, borders:{left:1, right:2, top:2, bottom:2}, stroke:"black"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("This does nothing right now.");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Save as Preset"
            })
        ]
    };});

    page.windowPreviewContainer = new Container({
        left: 0, right: 0, top: 0, bottom: 0,
        contents: [
            page.window.renderPreview(),
        ]
    });
    
    var statusContainer = new Container({
        left: 0, right: 0, top: 0, bottom: 0,
        contents: [
           sunIcon,
           thermometer,
           statusLine,
        ]
    });    
    
    
    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "white"}),
        contents: [
            headerBar,
			statusContainer,
            page.windowPreviewContainer,
            new Line({
                left: 0, right: 0, height: 35,
                contents: [
                    new EditButton({
                        window: page.window
                    }),
                    new SavePresetButton()
                ]
            }),
        ]
    });

    this.container = rootColumn;
    return this.container; // TODO: implement
};

StatusPage.prototype.updateContainerWithData = function() {
    if (this.container !== null) {
        this.temperatureLabel.string = this.window.temperature.toString().substring( 0, 4 ) + " F";
        this.brightnessLabel.string = "Sunshine: " + (Math.floor(this.window.brightness * 100)).toString().substring( 0, 4 ) + "%";
    }
};

module.exports = StatusPage;