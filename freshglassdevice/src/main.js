//@program

var Window = require("../../freshglassapp/src/lib/Window");

var currTemp = -1;
var currBrightness = -1;
var titleStyle = new Style( { font: "bold 20px", color:"green" } );

//Globals that should be changed
var tint = -1;
var images = []
var controls = null;


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
            brightness: { pin: 52 }
        }
    },
    temperatureSensor: {
        require: "temperature",
        pins: {
            temperature: { pin: 48 }
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
            string: "Fresh Glass Window"
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
        content.string = "Brightness: " + (result*100).toString().substring( 0, 4 ) + " %";
        currBrightness = result;
    },
});

TempContainer.behaviors[0] = Behavior.template({
	onTemperatureValueChanged: function(content, result) {
		content.string = "Temperature: " + result.toString().substring( 0, 4 ) + " °F";
		currTemp = result;
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
        windowPreviewContainer.empty();
        for (var i = 0; i < serializedWindows.length; i++) {
            var newWindow = Window.deserialize(serializedWindows[0]);
            windowPreviewContainer.add(new Container({
                left: 0, right: 0, top: 0, bottom: 0,
                contents: [
                    newWindow.renderPreview(Window.PREVIEW_HEIGHT / 2, Window.PREVIEW_WIDTH / 2)
                ]
            }));
        }
        message.responseText = JSON.stringify( { temperature: currTemp, brightness: currBrightness } );
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
