//@program
var THEME = require('themes/flat/theme');
var BUTTONS = require("controls/buttons");
var SLIDERS = require('controls/sliders');
// var currentPage = new Page();
// var nextPage = new EditPage(currentWindow, currentPage, switchPages);
var Window = require('lib/Window');
var MainPage = require("pages/MainPage");

var windowSelector = require("lib/windowSelector");

var MainPage = require("pages/MainPage");
var EditPage = require("pages/EditPage");
var StatusPage = require("pages/StatusPage");
var PresetsPage = require("pages/PresetsPage");

var currentPage = null; // global

var switchPages = function(nextPage) {
    if (nextPage !== null) {
        if (currentPage !== null) {
            application.remove(currentPage.getContainer());
        }
        currentPage = nextPage;
        if (nextPage.onNavigatedTo == "function") {
            nextPage.onNavigatedTo();
        }

        application.add(nextPage.getContainer());
    }
};

// Globals
var globalWindows = [
    new Window("Window 1"),
    new Window("Window 2"),
    new Window("Window 3"),
];
var mainPage = new MainPage(switchPages, globalWindows);

var editPage1 = new EditPage(mainPage.windows[0], mainPage.switchPages);
var statusPage1 = new StatusPage(mainPage.windows[0], mainPage.switchPages);

var editPage2 = new EditPage(mainPage.windows[1], mainPage.switchPages);
var statusPage2 = new StatusPage(mainPage.windows[1], mainPage.switchPages);

var editPage3 = new EditPage(mainPage.windows[2], mainPage.switchPages);
var statusPage3 = new StatusPage(mainPage.windows[2], mainPage.switchPages);

var presetsPage = new PresetsPage(mainPage.windows, mainPage.switchPages);

var device = null;
var deviceURL = "";

var ApplicationBehavior = Behavior.template({
    onDisplayed: function(application) {
        application.discover("freshglassdevice");
    },
    onQuit: function(application) {
        application.forget("freshglassdevice");
    },
});
Handler.bind("/discover", Object.create(Behavior.prototype, {
    onInvoke: { value: function(handler, message) {
        trace("discover\n");
        var discovery = JSON.parse(message.requestText);
        deviceURL = discovery.url;
        device = new Device(discovery);
        handler.invoke(new Message("/pollDevice"));
    },},
}));

Handler.bind("/forget", Object.create(Behavior.prototype, {
    onInvoke: { value: function(handler, message) {
       trace("\n/forget\n");
       device = null;
       deviceURL = "";
   }},
}));


//Live polling of the device
Handler.bind("/pollDevice", Behavior({
    onInvoke: function(handler, message){
        var windowsJSON = [];
        for (var i = 0; i < mainPage.windows.length; i++) {
            windowsJSON.push(mainPage.windows[i].serialize());
        }
        var message = device.createMessage("update", {windowsJSON: JSON.stringify(windowsJSON)});
        handler.invoke(message, Message.JSON);
    },
    onComplete: function(handler, message, json){
        //Update each window's information as needed
        //TO DO: need to update the sprite thing here? or call a StatusPage function
        mainPage.windows[0].updateSensorData(json.temperature1,json.brightness1);
        mainPage.windows[1].updateSensorData(json.temperature2,json.brightness2);
        mainPage.windows[2].updateSensorData(json.temperature3,json.brightness3);
        
        for (var i = 0; i < mainPage.windows.length; i++) {
            mainPage.windows[i].statusPage.updateContainerWithData();            
        }    
        handler.invoke(new Message("/delay"));
    }
}));

Handler.bind("/delay", {
    onInvoke: function(handler, message){
        handler.wait(100); //will call onComplete after X  milliseconds
    },
    onComplete: function(handler, message){
        handler.invoke(new Message("/pollDevice"));
    }
});

//Device object for each launched device 
var Device = function(discovery) {
        this.url = discovery.url;
        this.id = discovery.id;
        this.protocol = discovery.protocol;
        this.uuid = discovery.uuid;
};

Device.prototype = Object.create(Object.prototype, {
    url: { value: undefined, enumerable: true, writable: true },
    id: { value: undefined, enumerable: true, writable: true },
    protocol: { value: undefined, enumerable: true, writable: true },
    uuid: { value: undefined, enumerable: true, writable: true },
    createMessage: { value: function(name, query) {
        var url = this.url + name;
        if (query){
            url += "?" + serializeQuery(query);
        }
        return new Message(url);
    }
    }
});

application.behavior = new ApplicationBehavior();

switchPages(mainPage);
