//@module
var THEME = require('themes/flat/theme'); // required for BUTTONS to work???
var BUTTONS = require("controls/buttons");
var Window = require("lib/Window");
var NavBar = require("lib/NavBar");
var TitleBar = require("lib/TitleBar");

var StatusPage = require("pages/StatusPage");
var PresetsPage = require("pages/PresetsPage");

var blue = "#4682EA";

var floorplanURL = mergeURI(application.url, "images/floorplan.jpg");

var buttonSkin = new Skin({fill: "white", borders:{left:3, right:3, top:3, bottom:3}, stroke:"black"});
var rootSkin = new Skin({fill: "white"}); //root container's color
var labelStyle = new Style({ color: 'black', font: "30px Georgia", horizontal: 'center', vertical: 'middle', });


var MainPage = function (switchPages, windows) {
    this.switchPages = switchPages;
    this.container = null;
    this.previousPage = null;
    this.name = "main";
    this.windows = windows;
};

MainPage.prototype.getMainWindow = function () {
    return this.windows[0];
};



/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
MainPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;
	
    var HorizontalWindowButton1 = BUTTONS.Button.template(function($) { return {
        left: 75, right: 75, top: 52, height: 30,
        skin: buttonSkin, 
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                if ($.number == 1){
                	page.switchPages(statusPage1);
                } else {
                    page.switchPages(statusPage3);
                }
            }},
        }),
        contents: [
            new Label({
                top: 0, left: 0, bottom: 0, right: 0,
                style: labelStyle,
                string: $.string
            })
        ]
    };});
    
 	
    var HorizontalWindowButton3 = BUTTONS.Button.template(function($) { return {
        left: 73, right: 73, top: 295, height:30 ,
        skin: buttonSkin, 
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                if ($.number == 1){
                	page.switchPages(statusPage1);
                } else {
                    page.switchPages(statusPage3);
                }
            }},
        }),
        contents: [
            new Label({
                top: 0, left: 0, bottom: 0, right: 0,
                style: labelStyle,
                string: $.string
            })
        ]
    };});   
    
    var VerticalWindowButton = BUTTONS.Button.template(function($) { return {
        left: 285, right: 1, height: 140, top: 110,
        skin: buttonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                page.switchPages(statusPage2);                
            }},
            
            onDisplaying: {value: function(button) {
                var string = $.string;
                var size = labelStyle.measure(string);
                var label = new Label( { left: 0, right: 0, top: 0, bottom: 0}, undefined, labelStyle, string );
                var layer = new Layer( { width:button.height, height:size.height, opacity:0.9 });
                layer.add( label );
                layer.origin = { x:70, y:15 };
                layer.rotation = 90;
                button.add(layer);
            }},
        }),
        contents: []
    };});

    var titleBar = new TitleBar({name:"Fresh Glass", back: false, home: true, borders: true, page: page});

    var navBar = new NavBar({ page: page });
	
	var innerContainer = new Container({
		top: 0, left:0, right:0, bottom:0,
		skin: rootSkin,
		contents: [
            new Picture({width:300, height:500, top:0, bottom: 0, left:0, right:0, url: floorplanURL}),
			new HorizontalWindowButton1({ window: this.windows[0], string: this.windows[0].name, number: 1}),
			new VerticalWindowButton({window: this.windows[1], string: this.windows[1].name, number: 2}),
            new HorizontalWindowButton3({ window: this.windows[2], string: this.windows[2].name, number: 3}),
		]
	});

    var rootContainer = new Column({
        top: 0, left: 0, right: 0, bottom: 0,
        skin: rootSkin,
        contents: [
            titleBar,
			innerContainer,
        ]
    });

    rootContainer.add(navBar);

    this.container = rootContainer;
    return this.container;
};

module.exports = MainPage;