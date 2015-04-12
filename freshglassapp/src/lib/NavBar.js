// KPR Script file
var THEME = require('themes/flat/theme');
THEME.buttonStyle = new Style({ font: "20px Georgia"});
THEME.buttonSkin = new Skin({fill: "#00FFFFFF", borders:{left: 2, right:2, bottom:2}, stroke:"black" });

var BUTTONS = require('controls/buttons');

var backSkin = new Skin({fill:"transparent"});
var navBarSkin = new Skin({fill:"white"});

var navBarHeight = 35;

var windowNameStyle = new Style({font:"bold 25px", color:"black"});
var backStyle = new Style({font:"15", color:"black"});

var BackButtonTemplate = BUTTONS.Button.template(function($){ return {
	left:0, bottom:0, width:60, height:navBarHeight, skin: backSkin,
	contents: [
		new Label({left: 0, right: 0, height: navBarHeight, string: "< Back", style: backStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			$.page.switchPages($.page.previousPage);
		}}
	})
};});

var WindowNameTemplate = Label.template(function($) { return {
	left: 0, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var NavBar = Line.template(function($) {
	var buttonTemp = null;
	if ($.back) {
		buttonTemp = new BackButtonTemplate({page: $.page});
	}
	return {
		left:0, right:0, top:0, height: navBarHeight, skin: navBarSkin,
		contents: [
			buttonTemp,
			new WindowNameTemplate({name: $.name }),
		]
	};
});

module.exports = NavBar;