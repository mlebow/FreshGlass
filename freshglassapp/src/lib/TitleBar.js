// KPR Script file
var THEME = require('themes/flat/theme');
THEME.buttonStyle = new Style({ font: "20px Georgia"});
THEME.buttonSkin = new Skin({fill: "#00FFFFFF", borders:{left: 2, right:2, bottom:2}, stroke:"black" });

var BUTTONS = require('controls/buttons');

var blue = "#4682EA";

var backSkin = new Skin({ fill:"transparent" });
var navBarSkin = new Skin({fill:"white"});
var navBarSkinWithBorders = new Skin({fill:"white", borders: {bottom: 1}, stroke:"gray" });

var navBarHeight = 35;

var windowNameStyle = new Style({font:"bold Helvetica Neue", size: 22, color:blue});
var backStyle = new Style({font: "bold Helvetica Neue", size: 16, color:"black"});

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

var WindowNameTemplate2 = Label.template(function($) { return {
	left: -150, right: 0, bottom: 0, height: navBarHeight, string: $.name, style: windowNameStyle
};});

var TitleBar = Line.template(function($) {
	var buttonTemp = null;
	var navSkin = navBarSkin;
	var spaceTemplate = new WindowNameTemplate2({name: ""});;
	if ($.back) {
		buttonTemp = new BackButtonTemplate({page: $.page});
	} if ($.home) {
		spaceTemplate = null;
	} if ($.borders) {
		navSkin = navBarSkinWithBorders;
	}
	return {
		left:0, right:0, top:0, height: navBarHeight, skin: navSkin,
		contents: [
			buttonTemp,
			new WindowNameTemplate({name: $.name }),
			spaceTemplate,
		]
	};
});

module.exports = TitleBar;