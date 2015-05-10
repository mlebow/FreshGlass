// KPR Script file
var THEME = require('themes/flat/theme');
THEME.buttonStyle = new Style({ font: "20px Georgia"});
THEME.buttonSkin = new Skin({ fill: "#00FFFFFF", borders: {left: 2, right:2, bottom:2}, stroke:"black" });
var BUTTONS = require('controls/buttons');

var backSkin = new Skin({ fill:"transparent" });
var windowButtonSkin = new Skin({ fill:"white", borders: {bottom:1, top: 1, left: 1, right: 1}, stroke:"gray" });

var navBarSkin = new Skin({ fill:"white", borders: {bottom:1}, stroke:"gray" });
var navSkin = new Skin({ fill:"white" });

var navBarHeight = 35;

var menu = null;
var menuVisible = false;

var windowNameStyle = new Style({ font: "Helvetica Neue", size: 22, color: "#4682EA" });
var backStyle = new Style({ font: "bold Helvetica Neue", size: 16, color:"#4682EA" });
var titleStyle = new Style({ font: "bold Helvetica Neue", size: 20, color:"#4682EA" });

var menuURL = mergeURI(application.url, "images/blueMenu.png");

var MenuBarButtonTemplate = BUTTONS.Button.template(function($){ return {
    left: 15, bottom:0, width:20, height:navBarHeight, skin: backSkin,
    contents: [
        new Picture({ width:30, height:30, url: menuURL })
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            window1Button = new WindowButtonTemplate({page: $.page, string: "Window 1", index: 0});
            window2Button = new WindowButtonTemplate({page: $.page, string: "Window 2", index: 1});
            window3Button = new WindowButtonTemplate({page: $.page, string: "Window 3", index: 2});
            if (menuVisible) {
                $.page.container.remove(menu);
                menuVisible = false;
            } else {
                menu = new Container({ top: navBarHeight, left: 0, right: 0, bottom:0,
                    contents:[
                        new ViewMenuContainer({page: $.page, status: false, presets: true, edit: false}),
                    ],
                });
                $.page.container.add(menu);
                menuVisible = true;
            }
        }}
    })
};});

var ViewMenuContainer = Container.template(function($) { return {
    left: 0, right: 0, top: 0, bottom: 0,
    skin: new Skin({fill: "#2f000000"}),
    contents:[
        new Column({
            top:0, left: 0, right: 200, height: 200,
            contents:[
                window1Button,
                window2Button,
                window3Button,
            ],
        }),
    ]
};});

var WindowButtonTemplate = BUTTONS.Button.template(function($){ return {
    left:10, bottom:0, width: 80, height:navBarHeight, skin: windowButtonSkin,
    contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: backStyle,
                string: $.string
            })
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            $.page.container.remove(menu);
            menuVisible = false;
        
            if ($.page.name === "status") {
                $.page.switchPages(globalWindows[$.index].statusPage);
            } if ($.page.name === "edit") {
                $.page.switchPages(globalWindows[$.index].editPage);
            } if ($.page.name === "presets") {
                $.page.switchPages(presetsPage);
            }
        }}
    })
};});

var WindowNameTemplate = Label.template(function($) { return {
    left: 0, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var WindowSelector = Line.template(function($) {
    var buttonTemp = null;
    title = new Label({left: 25, right: 50, string: $.page.window.name, style: titleStyle});
    
    menuBar = new MenuBarButtonTemplate({ page: $.page });

    return {
        left:0, right:0, height: navBarHeight, skin: navBarSkin,
        contents: [
            menuBar,
            title,

        ]
    };
});

module.exports = WindowSelector;