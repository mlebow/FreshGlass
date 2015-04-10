//@module

var EditPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
EditPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    // TODO: replace this with Michael's general header bar template
    var headerBar = new Label({
        left: 0, right: 0, height: 40,
        skin: new Skin({fill: "green"}),
        style: new Style({color: "white"}),
        string: "Fresh Glass"
    });

    var TintTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "#00ffcc"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Tint tab goes nowhere.");
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

    var ImagesTab = BUTTONS.Button.template(function ($) { return {
        left: 0, right: 0, top: 0, bottom: 0,
        skin: new Skin({fill: "#00ffcc"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("Images tab goes nowhere.");
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
                trace("Control tab goes nowhere.");
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

    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "purple"}),
        contents: [
            headerBar,
            new Line({
                left: 0, right: 0, height: 50,
                contents: [
                    new TintTab(),
                    new ImagesTab(),
                    new ControlTab()
                ]
            }),
            new Container({
                left: 0, right: 0, top: 0, bottom: 0,
                contents: [
                    page.window.renderPreview(),
                ]
            }),
            new Line({
                left: 0, right: 0, height: 50,
                contents: [
                    new ApplyButton(),
                    new CancelButton()
                ]
            }),
            new Line({
                left: 0, right: 0, height: 50,
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