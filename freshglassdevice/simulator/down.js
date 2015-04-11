// This is a BLL which represents a button simulator for the down control. 

var PinsSimulators = require('PinsSimulators');

exports.configure = function (config) {
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
        header: {
            label: "Down Button",
            name: "",
            iconVariant: PinsSimulators.SENSOR_BUTTON
        },
        axes: [
            new PinsSimulators.DigitalInputAxisDescription({
                ioType: "input",
                valueLabel : "Down Button",
                valueID : "down",
                defaultControl: PinsSimulators.BOTTON
            }),
        ]
    });
};

var read = exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return axes.down;
}

exports.write = function () {};

exports.close = function () {
    shell.delegate("removeSimulatorPart", this.pinsSimulator);
};

exports.pins = {
    down: { type: "A2D" }
};