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


var MainPage = function (switchPages) {
    this.switchPages = switchPages;
    this.container = null;
    this.previousPage = null;

    this.name = "main";

    this.windows = [
        new Window("Window 1"),
        new Window("Window 2"),
        new Window("Window 3"),
    ];
    
    //var statusPage1 = new StatusPage(this.windows[0], this.switchPages);
    //var statusPage2 = new StatusPage(this.windows[1], this.switchPages);
    //var statusPage3 = new StatusPage(this.windows[2], this.switchPages);

    this.statusPages = [
        statusPage1, 
        statusPage2, 
        statusPage3,
    ];
    trace(statusPage1);
    for (var i = 0; i < this.windows.length; i ++){
        this.windows[i].statusPage = this.statusPages[i];
    }
};

//Make color changes here
var buttonSkin = new Skin({fill: "white", borders:{left:3, right:3, top:3, bottom:3}, stroke:"black"});
var rootSkin = new Skin({fill: "white"}); //root container's color
var labelStyle = new Style({ color: 'black', font: "30px Georgia", horizontal: 'center', vertical: 'middle', });

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
MainPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;
	
    var HorizontalWindowButton1 = BUTTONS.Button.template(function($) { return {
        left: 60, right: 40, top: 60, bottom: 310,
        skin: buttonSkin, 
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("statusPage1 " + statusPage1 + "\n");                
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
        left: 70, right: 70, top: 310, bottom: 60,
        skin: buttonSkin, 
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function (button) {
                trace("statusPage1 " + statusPage1 + "\n");                
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
                trace("statusPage 2 " + statusPage1 + "\n");                
                page.switchPages(statusPage2);                
            }},
            
            onDisplaying: {value: function(button) {
                //trace("onDisplaying\n");
                var string = $.string;
                var size = labelStyle.measure(string);
                var label = new Label( { left: 0, right: 0, top: 0, bottom: 0}, undefined, labelStyle, string );
                var layer = new Layer( { width:button.height, height:size.height, opacity:0.9 });
                layer.add( label );
                layer.origin = { x:70, y:15 };//hard coded the origin, no idea what it means... but it works, kinda
                layer.rotation = 90;
                button.add(layer);
            }},
        }),
        contents: []
    };});

    var titleBar = new TitleBar({name:"Fresh Glass", back: false, home: true, borders: true, page: page});
    var navBar = new NavBar({selected: this.windows[0].name, edit: false, status: false, presets: false, home: true, borders: true, page: page});
	
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
    
    
/*
    for (var i=0; i < this.windows.length; i++) {
        if (i % 2 === 0){
            rootContainer.add(new HorizontalWindowButton({
                window: this.windows[i],
                string: this.windows[i].name,
                number: i+1,
            }));
        } else {
            rootContainer.add(new VerticalWindowButton({
                window: this.windows[i],
                string: this.windows[i].name,
                number: i+1,
        }));
        
        }
    }
    */

    rootContainer.add(navBar);

    this.container = rootContainer;
    return this.container; // TODO: implement
};

module.exports = MainPage;
