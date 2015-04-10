// KPR Script file
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

var navBarSkin = new Skin({fill:"purple"});

var navBarHeight = 35;

var windowNameStyle = new Style({font:"bold 20px", color:"white"});
var backStyle = new Style({font:"20", color:"white"});

var backButtonTemplate = BUTTONS.Button.template(function($){ return {
	left:0, width:60, height:navBarHeight,
	contents: [
		new Label({left:0, right:0, height:navBarHeight, string:"< Back", style: backStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			$.page.switchPages($.page.previousPage);
		}}
	})
};});

var windowNameTemplate = Label.template(function($) { return {
	left: 0, right: 0, height: navBarHeight, string:$.name, style: windowNameStyle
};});

var navBar = Line.template(function($) { 
	var buttonTemp = null;
	if ($.back) {
		var buttonTemp = new backButtonTemplate({page:$.page});
	}
	return {
	left:0, right:0, top:0, height: navBarHeight, skin: navBarSkin, contents: [
		buttonTemp,
		new windowNameTemplate({name: $.name }),
	]};}
);

module.exports = navBar;