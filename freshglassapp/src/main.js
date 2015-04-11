//@program
var THEME = require('themes/flat/theme');
var BUTTONS = require("controls/buttons");
var SLIDERS = require('controls/sliders');
// var currentPage = new Page();
// var nextPage = new EditPage(currentWindow, currentPage, switchPages);

var MainPage = require("pages/MainPage");
var currentPage = null; // global

var switchPages = function(nextPage) {
    if (nextPage !== null) {
        if (currentPage !== null) {
            application.remove(currentPage.getContainer());
        }
        currentPage = nextPage;
        application.add(nextPage.getContainer());
    }
};

//This does device discovery
var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("freshglassdevice");
	},
    onQuit: function(application) {
        application.forget("freshglassdevice");
    },
});
application.behavior = new ApplicationBehavior();

var mainPage = new MainPage(switchPages);
switchPages(mainPage);
