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
deviceURL = "";

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
Handler.bind("/delay", {
    onInvoke: function(handler, message){
        handler.wait(100); //will call onComplete after 1 seconds
    },
    onComplete: function(handler, message){
        handler.invoke(new Message("/pollDevice"));
    }
});


Handler.bind("/pollDevice", Behavior({
	onInvoke: function(handler, message){
		handler.invoke(new Message(deviceURL + "update"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		statusLabel.string = json.status;
		//From Lebow's IPA3 for reference: foodPresentLabel.string = json.foodPresent;
        //Update the window information
        handler.invoke(new Message("/delay"));
	}
}));



var mainPage = new MainPage(switchPages);
switchPages(mainPage);
