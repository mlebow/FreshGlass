//@module
// This is a BLL which represents a slider simulator for window brightness, between 0 (no sun) and 1 (max sun)

var PinsSimulators = require('PinsSimulators');

exports.configure = function (config) {
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
        header: {
            label: "Window Brightness Levels",
            name: "Brightness",
            iconVariant: PinsSimulators.SENSOR_SLIDER
        },
        axes: [
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Window 1's Brightness",
                valueID : "brightness1",
                dataType: "float",
                minValue: 0.0,
                maxValue: 1.0,
                value: 1.0,
                defaultControl: PinsSimulators.SLIDER
            }),
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Window 2's Brightness",
                valueID : "brightness2",
                dataType: "float",
                minValue: 0.0,
                maxValue: 1.0,
                value: 1.0,
                defaultControl: PinsSimulators.SLIDER
            }),
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Window 3's Brightness",
                valueID : "brightness3",
                dataType: "float",
                minValue: 0.0,
                maxValue: 1.0,
                value: 1.0,
                defaultControl: PinsSimulators.SLIDER
            }),
        ]
    });
};

var read = exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return axes;
	}

exports.write = function () {};

exports.close = function () {
    shell.delegate("removeSimulatorPart", this.pinsSimulator);
};

exports.pins = {
    brightness1: { type: "A2D" }, 
    brightness2: { type: "A2D" },
    brightness3: {type: "A2D"} };