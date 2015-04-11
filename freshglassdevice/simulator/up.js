// This is a BLL which represents a button simulator for the up control. 

var PinsSimulators = require('PinsSimulators');

exports.configure = function (config) {
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
        header: {
            label: "Up Button",
            name: "",
            iconVariant: PinsSimulators.SENSOR_BUTTON
        },
        axes: [
            new PinsSimulators.DigitalInputAxisDescription({
                ioType: "input",
                valueLabel : "Up Button",
                valueID : "up",
                defaultControl: PinsSimulators.BOTTON
            }),
        ]
    });
};

var read = exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return axes.up;
}

exports.write = function () {};

exports.close = function () {
    shell.delegate("removeSimulatorPart", this.pinsSimulator);
};

exports.pins = {
    up: { type: "A2D" }
};