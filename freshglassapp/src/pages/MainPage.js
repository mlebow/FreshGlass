//@module
var THEME = require('themes/flat/theme'); // required for BUTTONS to work???
var BUTTONS = require("controls/buttons");
var Window = require("lib/Window");
var NavBar = require("lib/NavBar");

var StatusPage = require("pages/StatusPage");

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "AF6DC5";
var darkBlue = "#43489B";

var MainPage = function (switchPages) {
    this.switchPages = switchPages;
    this.container = null;
    this.previousPage = null;

    this.windows = [
        new Window("Window 1"),
        new Window("Window 2"),
        new Window("Window 3")
    ];

    this.statusPages = [
        new StatusPage(this.windows[0], this, this.switchPages),
        new StatusPage(this.windows[1], this, this.switchPages),
        new StatusPage(this.windows[2], this, this.switchPages),
    ];
};

//Make color changes here
var buttonSkin = new Skin({fill: "#80FFFFFF", borders:{left:3, right:3, top:3, bottom:3}, stroke:"black"});
var rootSkin = new Skin({fill: "#C2BAC6"}); //root container's color
var labelStyle = new Style({ color: 'black', font: "30px Georgia", horizontal: 'center', vertical: 'middle', });

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
MainPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;

    var HorizontalWindowButton = BUTTONS.Button.template(function($) { return {
        left: 50, right: 50, top: 30, bottom: 30,
        skin: buttonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                 var statusPage = $.statusPage;// new StatusPage($.window, page, page.switchPages);
                 page.switchPages(statusPage);
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
        left: 250, right: 20, height: 200, top: 10, 
        skin: buttonSkin,
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                 var statusPage = $.statusPage;// new StatusPage($.window, page, page.switchPages);
                 page.switchPages(statusPage);
            }},
            
            onDisplaying: {value: function(button) {
            	//trace("onDisplaying\n");
            	var string = $.string;
		        var size = labelStyle.measure(string);
		        var label = new Label( { left: 0, right: 0, top: 0, bottom: 0}, undefined, labelStyle, string );
		        var layer = new Layer( { width:button.height, height:size.height, opacity:0.9 });
		        layer.add( label );
		        layer.origin = { x:95, y:15 };//hard coded the origin, no idea what it means... but it works, kinda
		        layer.rotation = 90;
		        button.add(layer);
            }},
        }),
        contents: []
    };});    

    var navBar = new NavBar({name:"Fresh Glass", back: false, home: true, borders: true, page: page});

    var rootContainer = new Column({
        top: 0, left: 0, right: 0, bottom: 0,
        skin: rootSkin,
        contents: [
            navBar, 

        ]
    });

    for (var i=0; i < this.windows.length; i++) {
        if (i % 2 == 0){
	        rootContainer.add(new HorizontalWindowButton({
	            window: this.windows[i],
	            string: this.windows[i].name,
                statusPage: this.statusPages[i],
	        }));
        } else {
	        rootContainer.add(new VerticalWindowButton({
	            window: this.windows[i],
	            string: this.windows[i].name,
                statusPage: this.statusPages[i],
        }));        
        
        }
    }

    this.container = rootContainer;
    return this.container; // TODO: implement
};

module.exports = MainPage;