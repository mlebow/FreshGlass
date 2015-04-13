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
var index = 0;//keeps track of which device we are polling for 
var devices = []; //array of devices
var devicesTable = {}; //key: device's url (unique to each device) value: index of Device in devices array 

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
        var discovery = JSON.parse(message.requestText);
        var url = discovery.url;
        if (!(url in devicesTable)){
            var device = new Device(discovery);
            devicesTable[url] = devices.length;
            devices.push(device);
            trace("device's url: " +  device.url + " id:" + device.id + ", uuid: " + device.uuid +"\n\n");
            handler.invoke(new Message("/delay"));
        }
        else if (url in devicesTable){
            trace("discover same device?...\n");
        }

    },},
}));

Handler.bind("/forget", Object.create(Behavior.prototype, {
    onInvoke: { value: function(handler, message) {
        trace("\n/forget\n");
        var discovery = JSON.parse(message.requestText);
        var uuid = discovery.uuid;
        if (uuid in devicesTable) {
            trace("forgetting...\n");
            var index = devicesTable[uuid];
            var device = devices[index];
            delete devicesTable[uuid];
            devices.splice(index, 1);
        }
    },
    },
}));

//Live polling of the device
Handler.bind("/pollDevice", Behavior({
    onInvoke: function(handler, message){
        var device = devices[index];
        var message = device.createMessage("update", { uuid: device.uuid});
        handler.invoke(message, Message.JSON);
    },
    onComplete: function(handler, message, json){
        //Update the window information
        mainPage.windows[index].temperature = json.temperature;
        mainPage.windows[index].brightness = json.brightness;
        mainPage.statusPages[index].updateContainerWithData();
        index += 1;
        
        //to pollDevice for each launched device
        if (index == (devices.length)){
            index = 0;//reset index to 0
            handler.invoke(new Message("/delay"));
        } else{
            handler.invoke(new Message("/pollDevice"));
        }
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
