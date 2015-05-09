//@module

/**
 * NavBar.js is an module containing the navigation bar for the Fresh Glass app.
 */

var THEME = require('themes/flat/theme');
THEME.buttonStyle = new Style({ font: "20px Georgia"});
THEME.buttonSkin = new Skin({fill: "#00FFFFFF", borders:{left: 2, right:2, bottom:2}, stroke:"black" });

var BUTTONS = require('controls/buttons');

var backSkin = new Skin({ fill:"transparent" });
var navBarSkin = new Skin({fill:"white", borders: {top: 1}, stroke:"gray",});

var navBarHeight = 45;

var windowNameStyle = new Style({font:"Helvetica Neue", size: 22, color: "black"});
var backStyle = new Style({font: "bold Helvetica Neue", size: 16, color:"black"});

var grayHomeImageURL = mergeURI(application.url, "images/grayHome.png");
var blueHomeImageURL = mergeURI(application.url, "images/blueHome.png");

var grayStatusImageURL = mergeURI(application.url, "images/grayStatus.png");
var blueStatusImageURL = mergeURI(application.url, "images/blueStatus.png");

var grayEditImageURL = mergeURI(application.url, "images/grayEdit.png");
var blueEditImageURL = mergeURI(application.url, "images/blueEdit.png");

var grayPresetsImageURL = mergeURI(application.url, "images/grayPresets.png");
var bluePresetsImageURL = mergeURI(application.url, "images/bluePresets.png");

var GrayHomeButtonTemplate = BUTTONS.Button.template(function($) { return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 100, height: 40, url: grayHomeImageURL })
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            $.page.switchPages(mainPage);
        }}
    })
};});

var BlueHomeButtonTemplate = BUTTONS.Button.template(function($) { return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 40, height: 40, url: blueHomeImageURL })
    ]
};});

var GrayStatusButtonTemplate = BUTTONS.Button.template(function($){ return {
    left: 15, bottom: 0, width: 60, height: navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 40, height: 40, url: grayStatusImageURL })
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            if ($.page.getMainWindow().statusPage) {
                $.page.switchPages($.page.getMainWindow().statusPage);
            }
        }}
    })
};});

var BlueStatusButtonTemplate = BUTTONS.Button.template(function($){ return {
    left: 15, bottom: 0, width: 60, height: navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 40, height: 40, url: blueStatusImageURL })
    ]
};});

var GrayEditButtonTemplate = BUTTONS.Button.template(function($){ return {
    left: 15, bottom: 0, width: 60, height: navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 40, height: 40, url: grayEditImageURL })
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            if ($.page.getMainWindow().editPage) {
                $.page.switchPages($.page.getMainWindow().editPage);
            }
        }}
    })
};});

var BlueEditButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 15, bottom: 0, width: 60, height: navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 40, height: 40, url: blueEditImageURL })
    ]
};});

var GrayPresetsButtonTemplate = BUTTONS.Button.template(function($){ return {
    left: 15, bottom: 0, width: 60, height: navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 40, height: 40, url: grayPresetsImageURL })
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            $.page.switchPages(presetsPage);
        }}
    })
};});

var BluePresetsButtonTemplate = BUTTONS.Button.template(function($){ return {
    left: 15, bottom: 0, width: 60, height: navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width: 40, height: 40, url: bluePresetsImageURL })
    ]
};});

var WindowNameTemplate = Label.template(function($) { return {
    left: 0, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var NavBar = Line.template(function($) {
    var buttonTemp = null;
    var navSkin = navBarSkin;

    if ($.page.name === "main") {
        homeButton = new BlueHomeButtonTemplate({page: $.page});
    } else {
        homeButton = new GrayHomeButtonTemplate({page: $.page});
    }
    if ($.page.name === "edit" || $.page.name === "cameraRoll") {
        editButton = new BlueEditButtonTemplate({page: $.page});
    } else {
        editButton = new GrayEditButtonTemplate({page: $.page});
    }
    if ($.page.name === "status") {
        statusButton = new BlueStatusButtonTemplate({page: $.page});
    } else {
        statusButton = new GrayStatusButtonTemplate({page: $.page});
    }
    if ($.page.name === "presets" || $.page.name === "viewPreset") {
        presetButton = new BluePresetsButtonTemplate({page: $.page});
    } else {
        presetButton = new GrayPresetsButtonTemplate({page: $.page});
    }

    return {
        left:0, right:0, height: navBarHeight, skin: navSkin,
        contents: [
            homeButton,
            statusButton,
            editButton,
            presetButton,
        ]
    };
});

module.exports = NavBar;
