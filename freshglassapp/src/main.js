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
        if (nextPage.onNavigatedTo) {
            nextPage.onNavigatedTo();
        }
        application.add(nextPage.getContainer());
    }
};


//Globals
var mainPage = new MainPage(switchPages);
deviceURL = "";

//This does device discovery
Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		application.invoke(new Message("/pollDevice"));
	},
}));


Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("freshglassdevice");
	},
    onQuit: function(application) {
        application.forget("freshglassdevice");
    },
});
application.behavior = new ApplicationBehavior();

//Live polling of the device
Handler.bind("/pollDevice", Behavior({
    onInvoke: function(handler, message){
        handler.invoke(new Message(deviceURL + "update"), Message.JSON);
    },
    onComplete: function(handler, message, json){
        //From Lebow's IPA3 for reference: foodPresentLabel.string = json.foodPresent;
        //Update the window information
        //One window is hard-coded right now
        mainPage.windows[0].temperature = json.temperature;
        mainPage.windows[0].brightness = json.brightness;
        mainPage.statusPages[0].updateContainerWithData();
        mainPage.windows[0].updatePreview();
        //trace(mainPage.statusPages[0].container.temperatureLabel.string + "\n");
        handler.invoke(new Message("/delay"));
    }
}));

Handler.bind("/delay", {
    onInvoke: function(handler, message){
        handler.wait(100); //will call onComplete after 1 seconds
    },
    onComplete: function(handler, message){
        handler.invoke(new Message("/pollDevice"));
    }
});





switchPages(mainPage);
