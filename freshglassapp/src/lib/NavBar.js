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

var grayHomeURL = mergeURI(application.url, "images/grayHome.png");
var blueHomeURL = mergeURI(application.url, "images/blueHome.png");

var grayStatusURL = mergeURI(application.url, "images/grayStatus.png");
var blueStatusURL = mergeURI(application.url, "images/blueStatus.png");

var grayEditURL = mergeURI(application.url, "images/grayEdit.png");
var blueEditURL = mergeURI(application.url, "images/blueEdit.png");

var grayPresetsURL = mergeURI(application.url, "images/grayPresets.png");
var bluePresetsURL = mergeURI(application.url, "images/bluePresets.png");

var grayHomeButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({ width:100, height:40, url: grayHomeURL })
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            $.page.switchPages(mainPage);
        }}
    })
};});

var blueHomeButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({width:40, height:40, url: blueHomeURL})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
        }}
    })
};});

var grayStatusButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({width:40, height:40, url: grayStatusURL})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            if ($.selected == "Window 2"){
                $.page.switchPages(statusPage2);
            } if ($.selected == "Window 3"){
                $.page.switchPages(statusPage3);
            } else {
                $.page.switchPages(statusPage1);
            }
        }}
    })
};});

var blueStatusButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({width:40, height:40, url: blueStatusURL})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
        }}
    })
};});

var grayEditButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({width:40, height:40, url: grayEditURL})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            trace("SELECTED IS" + $.selected);
            if ($.selected == "Window 2"){
                $.page.switchPages(editPage2);
            } if ($.selected == "Window 3"){
                $.page.switchPages(editPage3);
            } else {
                $.page.switchPages(editPage1);
            }
        }}
    })
};});

var blueEditButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({width:40, height:40, url: blueEditURL})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
        }}
    })
};});

var grayPresetsButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({width:40, height:40, url: grayPresetsURL})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            $.page.switchPages(presetsPage);
        }}
    })
};});

var bluePresetsButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:15, bottom:0, width:60, height:navBarHeight, skin: backSkin,
    contents: [
         new Picture({width:40, height:40, url: bluePresetsURL})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
        }}
    })
};});

var WindowNameTemplate = Label.template(function($) { return {
    left: 0, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var WindowNameTemplate2 = Label.template(function($) { return {
    left: -150, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var NavBar = Line.template(function($) {
    var buttonTemp = null;
    var navSkin = navBarSkin;
    
    var spaceTemplate = new WindowNameTemplate2({name: ""});

    if ($.home) {
        homeButton = new blueHomeButtonTemplate({page: $.page, selected: $.selected});
    } else {
        homeButton = new grayHomeButtonTemplate({page: $.page, selected: $.selected});
    }
    if ($.edit) {
        editButton = new blueEditButtonTemplate({page: $.page, selected: $.selected});
    } else {
        editButton = new grayEditButtonTemplate({page: $.page, selected: $.selected});
    }
    if ($.status) {
        statusButton = new blueStatusButtonTemplate({page: $.page, selected: $.selected});
    } else {
        statusButton = new grayStatusButtonTemplate({page: $.page, selected: $.selected});
    }   if ($.presets) {
        presetButton = new bluePresetsButtonTemplate({page: $.page, selected: $.selected});
    } else {
        presetButton = new grayPresetsButtonTemplate({page: $.page, selected: $.selected});
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
