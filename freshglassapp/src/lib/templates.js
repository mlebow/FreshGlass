// KPR Script file
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

var headerSkin = new Skin({fill:"purple"});

var headerHeight = 35;

var windowNameStyle = new Style({font:"bold 20px", color:"white"});
var backStyle = new Style({font:"20", color:"white"});

var backButtonTemplate = BUTTONS.Button.template(function($){ return{
	left:0, width:60, height:headerHeight,
	contents: [
		new Label({left:0, right:0, height:headerHeight, string:"< Back", style: backStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("go to " + $.page);
		}},
	})
}});

var windowNameTemplate = Label.template(function($) { return {
	left: 0, right: 0, height: headerHeight, string:$.name, style: windowNameStyle
}});

exports.header = Line.template(function($) { return {
	left:0, right:0, top:0, height: headerHeight, skin: headerSkin, contents: [
		new backButtonTemplate({page:$.prev_page, used:$.back}),
		new windowNameTemplate({name:$.name}),
	]}}
);
