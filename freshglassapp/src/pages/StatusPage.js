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

    this.temperatureLabel = new Label({
        left: 0, right: 0, height: 100,
        style: new Style({color: "black", font: "25px Georgia"}),
        string: page.window.temperature + " F"
    });

    this.brightnessLabel = new Label({
        left: 0, right: 0, height: 100,
        style: new Style({color: "black", font: "25px Georgia"}),
        string: "Sunshine: " + (Math.floor(page.window.brightness * 100)) + "%"
    });

    var statusLine = new Line({
        left: 0, right: 0, height: 100,
        contents: [page.temperatureLabel, page.brightnessLabel]
    });

    var EditButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top:0, bottom: 0,
        skin: new Skin({fill: "#3E1255", borders:{left:2, right:1, top:2, bottom:2}, stroke:"black"}),
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
        skin: new Skin({fill: "#3E1255", borders:{left:1, right:2, top:2, bottom:2}, stroke:"black"}),
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
            page.window.renderPreview()
        ]
    });

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "#C2BAC6"}),
        contents: [
            headerBar,
            statusLine,
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

StatusPage.prototype.rerenderWindowPreview = function() {
    this.windowPreviewContainer.empty();
    this.windowPreviewContainer.add(this.window.renderPreview());
};

StatusPage.prototype.updateContainerWithData = function() {
    if (this.container !== null) {
        this.temperatureLabel.string = this.window.temperature.toString().substring( 0, 4 ) + " F";
        this.brightnessLabel.string = "Sunshine: " + (Math.floor(this.window.brightness * 100)).toString().substring( 0, 4 ) + "%";
        this.rerenderWindowPreview();
    }
};

module.exports = StatusPage;