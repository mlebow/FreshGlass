// KPR Script file
var NavBar = require('lib/NavBar');
var SLIDERS = require('controls/sliders');
var Window = require('lib/Window');

var CameraRoll = function (window, previousPage, switchPages) {
	this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
};

var red = "#DB4C3F";
var blue = "#4682EA";
var yellow = "#FDBA35";
var green = "#67AF4B";
var purple = "#AF6DC5";
var darkBlue = "#43489B";


/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
CameraRoll.prototype.getContainer = function () {
    if (this.container) { return this.container; }
    var page = this;
    var imageData = null;
	var imageURLs = null;
	var imageBase = "http://michaelhobo.com/camera_roll/";
	var numImages = 0;
	var curImage = 0;
    var navBar = new NavBar({ name: page.window.name, back: true, page: page });
    var arrowTemplate = BUTTONS.Button.template(function ($) { 
    	var arrow = ">";
    	if ($.direction == "left") {
    		arrow = "<";
    	}
    	return {
        	width: 50, top: 0, bottom: 0,
        	skin: new Skin({fill: "#dddddd"}),
        	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            	onTap: { value: function (button) {
                	trace("switch " + $.direction);
                	if (numImages != 0) {
                		if ($.direction == "left") {
                			curImage -= 1;
                			if (curImage < 0) curImage = numImages - 1;
                			image.url = imageBase + imageURLs[curImage];
                		} else if ($.direction == "right") {
                			curImage += 1;
                			if (curImage >= numImages) curImage = 0;
                			image.url = imageBase + imageURLs[curImage];
                		}
                	}
            	}}
        	}),
        	contents: [
            	new Label({
                	left: 0, right: 0, bottom: 0, top: 0,
                	style: new Style({color: "black"}),
                	string: arrow,
            	})
        	]
    	}
    });
    var image = new Picture({left:0, top:0, right: 0, bottom: 0, 
    	behavior: Object.create(Container.prototype, {
			//onTouchMoved: { value: function(content, id, x, y, ticks){
			//	trace("touch moved " + x + "," + y + "\n");
			//}},
			onTouchEnded: { value: function(content) {
				trace("touch ended\n");
			}},
		}),
	}, '');
    var imageContainer = new Column({
		top: 10, left: 10, right: 10, bottom: 10, contents: [image], 
		behavior: Object.create(Container.prototype, {
			//onTouchMoved: { value: function(content, id, x, y, ticks){
			//	trace("touch moved " + x + "," + y + "\n");
			//}},
			onTouchEnded: { value: function(content) {
				trace("touch ended\n");
			}},
		}),
	});
	var picker = new Line({top:0, left:0, right:0, height:300, 
		contents: [
			new arrowTemplate({direction: "left"}),
			imageContainer,
			new arrowTemplate({direction: "right"}),
		]
	});
	var insertButton = BUTTONS.Button.template(function ($) {
    	return {
        	top: 0, bottom: 0, width: 200, height: 40,
        	skin: new Skin({fill: darkBlue}),
        	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            	onTap: { value: function (button) {
                	var scale = 0.2;
                	var url = imageBase + imageURLs[curImage];
                	var height = Window.PREVIEW_HEIGHT * scale;
                	var width = Window.PREVIEW_WIDTH * scale;
                	var startX = 0;
                	var startY = 0;
                	//page.window.addImage(imageBase + imageURLs[curImage], scale, 0, 0);
                	trace(url + " " + startX + " " + startY + " " + height + " " + width + "\n");
                	page.previousPage.windowCopy.addImage(url, startX, startY, height, width);
                	//page.previousPage.windowCopy.updatePreview()
                	page.switchPages(page.previousPage);
                	
            	}}
        	}),
        	contents: [
            	new Label({
                	left: 0, right: 0, bottom: 0, top: 0,
                	style: new Style({color: "#dddddd", font: "Helvetica Neue"}),
                	string: "Insert",
            	})
        	]
    	}
    });
	var insert = new Line({top:0, height:50, 
		contents: [
			new insertButton(),
		]
	});	
    var rootColumn = new Column({
        top: 0, left: 0, bottom: 0, right: 0,
        skin: new Skin({fill: "#dddddd"}),
        behavior: Object.create(Behavior.template, {
            onCreate: { value: function (container) {
                trace("created");
                var uri = "http://michaelhobo.com/camera_roll";
                container.invoke(new Message( uri ), Message.JSON );
            }},
            onComplete: { value: function(container, message, json) {
            	imageData = JSON.parse(json.toRawString());
            	numImages = Object.keys(imageData).length;
            	imageURLs = new Array(numImages);
            	var count = 0;
            	for (key in imageData) {
            		imageURLs[count] = imageData[key];
            		count += 1;
            	}
            	image.url = imageBase + imageURLs[0];
            }},
            onTouchMoved: { value: function() {
            	trace("touched rootColumn");
            }},
        }),
        contents: [
            navBar,
			picker,
			insert,
        ]
    });

    this.container = rootColumn;
    return this.container; // TODO: implement
};

module.exports = CameraRoll;