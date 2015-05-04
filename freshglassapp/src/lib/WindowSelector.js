// KPR Script file
var THEME = require('themes/flat/theme');
THEME.buttonStyle = new Style({ font: "20px Georgia"});
THEME.buttonSkin = new Skin({fill: "#00FFFFFF", borders:{left: 2, right:2, bottom:2}, stroke:"black" });

var BUTTONS = require('controls/buttons');

var backSkin = new Skin({ fill:"transparent"});
var windowButtonSkin = new Skin({ fill:"transparent", borders:{bottom:1, top: 1, left: 1, right: 1}, stroke:"gray"  });

var navBarSkin = new Skin({fill:"white", borders:{bottom:1}, stroke:"gray" });
var navSkin = new Skin({fill:"white"});

var navBarHeight = 35;

var menu = null;

var menuVisible = false;

var windowNameStyle = new Style({font:"Helvetica Neue", size: 22, color: "#4682EA"});
var backStyle = new Style({font: "bold Helvetica Neue", size: 16, color:"#4682EA"});
var titleStyle = new Style({font: "bold Helvetica Neue", size: 20, color:"#4682EA"});

var number = 1;

var menuURL = mergeURI(application.url, "images/blueMenu.png");

var MenuBarButtonTemplate = BUTTONS.Button.template(function($){ return {
	left:10, bottom:0, width:20, height:navBarHeight, skin: backSkin,
	contents: [
		 new Picture({width:30, height:30, url: menuURL})

	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			if ($.status){
				window1Button = new Window1ButtonTemplate({page: $.page, status: true, presets: false, edit: false});
				window2Button = new Window2ButtonTemplate({page: $.page, status: true, presets: false, edit: false});
				window3Button = new Window3ButtonTemplate({page: $.page, status: true, presets: false, edit: false});		
			} if ($.edit){
				window1Button = new Window1ButtonTemplate({page: $.page, status: false, presets: false, edit: true});
				window2Button = new Window2ButtonTemplate({page: $.page, status: false, presets: false, edit: true});
				window3Button = new Window3ButtonTemplate({page: $.page, status: false, presets: false, edit: true});		
			} if ($.presets){
				window1Button = new Window1ButtonTemplate({page: $.page, status: false, presets: true, edit: false});
				window2Button = new Window2ButtonTemplate({page: $.page, status: false, presets: true, edit: false});
				window3Button = new Window3ButtonTemplate({page: $.page, status: false, presets: true, edit: false});				
			}	

			if (menuVisible){
				$.page.container.remove(menu);
				menuVisible = false;
			} else {
	            menu = new Container({ top:0, left: 0, right: 0, bottom:0, skin: navSkin,
	                    contents:[
							new ViewMenuContainer({page: $.page, status: false, presets: true, edit: false}),
	                    ],
	            })          	 	
	          	$.page.container.insert(menu, $.page.container.first.next);   
	          	menuVisible = true;
            }                	
		}}
	})
};});

var ViewMenuContainer = Container.template(function($) {return { 
        left: 0, right: 200, top: 0, 
        skin: navSkin,
        contents:[
            new Column({ 
                top:0, left: 0, right: 200, height: 200,
                contents:[
					window1Button, 
					window2Button, 
					window3Button,
                ],
            }),
        ], 
}}); 


var Window1ButtonTemplate = BUTTONS.Button.template(function($){ return {
	left:20, bottom:0, width: 80, height:navBarHeight, skin: windowButtonSkin,
	contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: backStyle,
                string: "Window 1"
            })
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			$.page.container.remove(menu);
			menuVisible = false;
		
			if ($.status){
				$.page.switchPages(statusPage1);
			} if ($.edit){
				$.page.switchPages(editPage1);
			} if ($.presets){
				$.page.switchPages(presetsPage1);
			} 
		}}
	})
};});

var Window2ButtonTemplate = BUTTONS.Button.template(function($){ return {
	left:20, bottom:0, width:80, height:navBarHeight, skin: windowButtonSkin,
	contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: backStyle,
                string: "Window 2"
            })
	],
	
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			$.page.container.remove(menu);
			menuVisible = false;
			
			if ($.status){
				$.page.switchPages(statusPage2);
			} if ($.edit){
				$.page.switchPages(editPage2);
			} if ($.presets){
				$.page.switchPages(presetsPage2);
			} 
			
		}}
	})
};});

var Window3ButtonTemplate = BUTTONS.Button.template(function($){ return {
	left:20, bottom:0, width:80, height:navBarHeight, skin: windowButtonSkin,
	contents: [
            new Label({
                left: 0, right: 0, bottom: 0, top: 0,
                style: backStyle,
                string: "Window 3"
            })
	],
	
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			$.page.container.remove(menu);
			menuVisible = false; 
			
			if ($.status){
				$.page.switchPages(statusPage3);
			} if ($.edit){
				$.page.switchPages(editPage3);
			} if ($.presets){
				$.page.switchPages(presetsPage3);
			} 
		}}
	})
};});

var WindowNameTemplate = Label.template(function($) { return {
	left: 0, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var WindowNameTemplate2 = Label.template(function($) { return {
	left: -150, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var WindowSelector = Line.template(function($) {
	var buttonTemp = null;
	if ($.name == "Window 1"){
		title = new Label({left: 30, right: 50, string: "Window 1", style: titleStyle});
	} if ($.name == "Window 2"){
		title = new Label({left: 30, right: 50, string: "Window 2", style: titleStyle});
	} if ($.name == "Window 3"){
		title = new Label({left: 30, right: 50, string: "Window 3", style: titleStyle});
	}
	
	menuBar = new MenuBarButtonTemplate({page: $.page, status: $.status, edit: $.edit, presets: $.presets, name: $.name});
	
	return {
		left:0, right:0, height: navBarHeight, skin: navBarSkin,
		contents: [
			menuBar,
			title,

		]
	};
});

module.exports = WindowSelector;