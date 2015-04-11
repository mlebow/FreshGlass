//@module
var NavBar = require("lib/NavBar");
var SLIDERS = require('controls/sliders');

var EditPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
    this.currentTab = "tint";
    this.tabContainers = {
        tint: null,
        images: null,
        control: null
    };
};

EditPage.prototype.activateTab = function (tab) {
    this.tabContainers[this.currentTab].skin = new Skin({fill: "#00ffcc"});
    this.currentTab = tab;
    this.tabContainers[this.currentTab].skin = new Skin({fill: "red"});
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
EditPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var headerBar = new NavBar({ name: page.window.name, back: true, page: page });

    var TintTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "#00ffcc"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.activateTab("tint");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Tint"
            })
        ]
    };});

    var TintSlider = SLIDERS.HorizontalSlider.template(function($){ return{
        left: 0, right: 0, top: 0, bottom: 0,
        behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
            onCreate: { value : function(container) {
                this.data = {min:0, max:1, value: page.window.tint}; 
            }},
            onValueChanged: { value: function(container){           
                SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
                page.window.tint = this.data.value;
            }},     
        }),
    };});


    var ImagesTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "#00ffcc"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.activateTab("images");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Images"
            })
        ]
    };});

    var ControlTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "#00ffcc"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.activateTab("control");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Control"
            })
        ]
    };});


    var controlContainer = new Container({
        left: 0, right: 0, height: 70,
        skin: new Skin({fill: "red"}),
        contents: [
            new TintSlider()
        ],
    });

    var ApplyButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "green"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Apply button does nothing for now.");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Apply"
            })
        ]
    };});

    var CancelButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "#ff9000"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Cancel does nothing right now.");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Cancel"
            })
        ]
    };});

    var ClearButton = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "green"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Clear does nothing right now.");
            }}
        }),
        contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: new Style({color: "white"}),
                string: "Clear"
            })
        ]
    };});

    page.tabContainers.tint = new TintTab();
    page.tabContainers.images = new ImagesTab();
    page.tabContainers.control = new ControlTab();

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "purple"}),
        contents: [
            headerBar,
            new Line({
                left: 0, right: 0, height: 35,
                contents: [
                    page.tabContainers.tint,
                    page.tabContainers.images,
                    page.tabContainers.control
                ]
            }),
            controlContainer,
            new Container({
                left: 0, right: 0, top: 0, bottom: 0,
                contents: [
                    page.window.renderPreview(),
                ]
            }),
            new Line({
                left: 0, right: 0, height: 35,
                contents: [
                    new ApplyButton(),
                    new CancelButton()
                ]
            }),
            new Line({
                left: 0, right: 0, height: 35,
                contents: [
                    new ClearButton()
                ]
            }),
        ]
    });

    this.container = rootColumn;
    return this.container; // TODO: implement
};

module.exports = EditPage;