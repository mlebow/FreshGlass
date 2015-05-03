//@program

var Window = require("lib/Window");

var currTemps = [-1, -1, -1];
var currBrightness = [-1, -1, -1];
var titleStyle = new Style( { font: "bold 20px", color:"green" } );

//Globals that should be changed
var tints = [-1, -1, -1];
var imagesList = [[],[],[]];
var controls = [null, null, null];


var ApplicationBehavior = Behavior.template({
    onLaunch: function(application) {
        application.shared = true;
    },
    onQuit: function(application) {
        application.shared = false;
    },
});

Handler.bind("/gotBrightnessResult", Object.create(Behavior.prototype, {
    onInvoke: { value: function( handler, message ){
                var result = message.requestObject;
                application.distribute( "onBrightnessValueChanged", result );
            }}
}));
Handler.bind("/gotTemperatureResult", Object.create(Behavior.prototype, {
    onInvoke: { value: function( handler, message ){
                var result = message.requestObject;
                application.distribute( "onTemperatureValueChanged", result );
            }}
}));

/* Create message for communication with hardware pins.
    brightnessSensor: name of pins object, will use later for calling 'brightnessSensor' methods.
    require: name of js or xml bll file. In simulator file
    pins: initializes 'analog' (matches 'analog' object in the bll) with the given pin numbers. 
        Pin types and directions are set within the bll.    */
application.invoke( new MessageWithObject( "pins:configure", {
    brightnessSensor: {
        require: "brightness",
        pins: {
            brightness1: { pin: 50 }, 
            brightness2: { pin: 51 }, 
            brightness3: { pin: 52 } 
      
        }
    },
    temperatureSensor: {
        require: "temperature",
        pins: {
            temperature1: { pin: 47 },
            temperature2: { pin: 48 },
            temperature3: { pin: 49 }
            
        }
    },
}));

/* Use the initialized brightnessSensor object and repeatedly 
   call its read method with a given interval.  */
application.invoke( new MessageWithObject( "pins:/brightnessSensor/read?" +
    serializeQuery( {
        repeat: "on",
        interval: 100,
        callback: "/gotBrightnessResult"
} ) ) );

application.invoke( new MessageWithObject( "pins:/temperatureSensor/read?" +
    serializeQuery( {
        repeat: "on",
        interval: 100,
        callback: "/gotTemperatureResult"
} ) ) );

var MainContainer = Container.template(function($) { return {
    left: 0, right: 0, height:30, skin: new Skin({ fill: 'white',}),
    contents: [
        Label($, {
            left: 0, right: 0,
            style: new Style({ color: 'green', font: '15px Helvetica', horizontal: 'null', vertical: 'null', }),
            string: "Fresh Glass Window Hub"
        }),
    ],
};});

var BrightnessContainer = Container.template(function($) { return {
    left: 0, right: 0, height:20, skin: new Skin({ fill: 'white',}),
    contents: [
        Label($, {
            left: 0, right: 0,
            style: new Style({ color: 'orange', font: '15px Helvetica', horizontal: 'null', vertical: 'null', }),
            behavior: Object.create((BrightnessContainer.behaviors[0]).prototype),
            string: '- - -',
        }),
    ],
};});

var TempContainer = Container.template(function($) { return {
    left: 0, right: 0, height:20, skin: new Skin({ fill: 'white',}),
    contents: [
        Label($, {
            left: 0, right: 0,
            style: new Style({ color: 'red', font: '15px', horizontal: 'null', vertical: 'null', }),
            behavior: Object.create((TempContainer.behaviors[0]).prototype),
            string: '- - -',
        }),
    ],
};});

BrightnessContainer.behaviors = new Array(1);
TempContainer.behaviors = new Array(1);

BrightnessContainer.behaviors[0] = Behavior.template({
    onBrightnessValueChanged: function(content, result) {
        currBrightness[0] = (result.brightness1*100).toString().substring( 0, 4 );
        currBrightness[1] = (result.brightness2*100).toString().substring( 0, 4 );
        currBrightness[2] = (result.brightness3*100).toString().substring( 0, 4 );
        content.string = "Brightness Levels: " + currBrightness[0] + " %, " + 
                         currBrightness[1] + " %, " + currBrightness[2]  +  " %, "
    },
});

TempContainer.behaviors[0] = Behavior.template({
	onTemperatureValueChanged: function(content, result) {
		currTemps[0] = result.temperature1.toString().substring( 0, 4 );
		currTemps[1] = result.temperature2.toString().substring( 0, 4 );
	    currTemps[2] = result.temperature3.toString().substring( 0, 4 );
		content.string = "Temperature Levels: " + 
			currTemps[0] + " °F, " + 
	        currTemps[1] + " °F, " + 
			currTemps[2]+ " °F";
	},
});

// This is where communication with the iPhone App Begins
var ApplicationBehavior = Behavior.template({
    onLaunch: function(application) {
        application.shared = true;
    },
    onQuit: function(application) {
        application.shared = false;
    },
});

// Handle Messages from the Phone
var windowPreviewContainer = new Line({
    left: 0, right: 0, bottom: 0, top: 0, contents: [],
    skin: new Skin({fill: "white"})
});

// Send the phone updates about the sensor data
Handler.bind("/update", Behavior({
    onInvoke: function(handler, message) {
        var serializedWindows = JSON.parse(parseQuery(message.query).windowsJSON);
        //windowPreviewContainer.empty();
        for (var i = 0; i < serializedWindows.length; i++) {
            var newWindow = Window.deserialize(serializedWindows[i]);
            windowPreviewContainer.add(new Container({
                left: 0, right: 0, top: 0, bottom: 0,
                contents: [
                    //change device preview dimension ratio here
                    newWindow.renderPreview(Window.PREVIEW_HEIGHT*.5, Window.PREVIEW_WIDTH*.33)
                    //change device preview dimension ratio here
                ]
            }));
        }
        message.responseText = JSON.stringify( { 
            temperature1: currTemps[0], brightness1: currBrightness[0], 
            temperature2: currTemps[1], brightness2: currBrightness[1], 
            temperature3: currTemps[2], brightness3: currBrightness[2]
 } );
        message.status = 200;
    }
}));

application.add(new Column({
    top: 0, left: 0, bottom: 0, right: 0,
    contents: [
        new MainContainer(),
        new BrightnessContainer(),
        new TempContainer(),
        windowPreviewContainer
    ]
}));

application.behavior = new ApplicationBehavior();
