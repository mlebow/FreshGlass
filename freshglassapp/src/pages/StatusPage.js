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
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
StatusPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    // TODO: replace this with Michael's general header bar template
    var headerBar = new NavBar({ name: page.window.name, back: true, page: page });

    var temperatureLabel = new Label({
        left: 0, right: 0, height: 100,
        style: new Style({color: "red", font: "bold 20px"}),
        string: page.window.temperature + " F"
    });

    var brightnessLabel = new Label({
        left: 0, right: 0, height: 100,
        style: new Style({color: "red", font: "bold 20px"}),
        string: "Sunshine: " + (Math.floor(page.window.brightness * 100)) + "%"
    });

    var EditButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, height: 70,
        skin: new Skin({fill: "green"}),
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
        left: 0, right: 0, height: 70,
        skin: new Skin({fill: "green"}),
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

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "purple"}),
        contents: [
            headerBar,
            new Line({
                left: 0, right: 0, height: 100,
                contents: [temperatureLabel, brightnessLabel]
            }),
            new Container({
                left: 0, right: 0, top: 0, bottom: 0,
                contents: [
                    page.window.renderPreview(),
                ]
            }),
            new Line({
                left: 0, right: 0, height: 70,
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
    // nothing for now
};

module.exports = StatusPage;