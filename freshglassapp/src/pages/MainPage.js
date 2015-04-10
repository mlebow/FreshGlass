//@module
var THEME = require('themes/flat/theme'); // required for BUTTONS to work???
var BUTTONS = require("controls/buttons");
var Window = require("lib/Window");
var NavBar = require("lib/NavBar");

var StatusPage = require("pages/StatusPage");

var MainPage = function (switchPages) {
    this.switchPages = switchPages;
    this.container = null;
    this.previousPage = null;

    this.windows = [
        new Window("Window 1"),
        new Window("Window 2"),
        new Window("Window 3")
    ];
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
MainPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var WindowButton = BUTTONS.Button.template(function($) { return {
        left: 0, right: 0, height: 40,
        skin: new Skin({fill: "blue"}),
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                 var statusPage = new StatusPage($.window, page, page.switchPages);
                 page.switchPages(statusPage);
            }}
        }),
        contents: [
            new Label({
                top: 0, left: 0, bottom: 0, right: 0,
                style: new Style({color: "white"}),
                string: $.string
            })
        ]
    };});

    var navBar = new NavBar({name:"Fresh Glass", back: false, page: page});

    var rootContainer = new Column({
        top: 0, left: 0, right: 0, bottom: 0,
        contents: [
            navBar
        ]
    });

    for (var i=0; i < this.windows.length; i++) {
        rootContainer.add(new WindowButton({
            window: this.windows[i],
            string: this.windows[i].name,
        }));
    }

    this.container = rootContainer;
    return this.container; // TODO: implement
};

module.exports = MainPage;