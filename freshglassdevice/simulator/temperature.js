//@module
// This is a BLL which represents a slider simulator for window temperature, between 32 and 90 degrees F.

var PinsSimulators = require('PinsSimulators');

exports.configure = function (config) {
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
        header: {
            label: "Window Temperatures",
            name: "in Fahrenheit",
            iconVariant:PinsSimulators.SENSOR_SLIDER
        },
        axes: [
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Window 1's Temperature",
                valueID : "temperature1",
                dataType: "float",
                minValue: 0.0,
                maxValue: 110.0,
                value: 50.0,
                defaultControl: PinsSimulators.SLIDER
            }),
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Window 2's Temperature",
                valueID : "temperature2",
                dataType: "float",
                minValue: 0.0,
                maxValue: 110.0,
                value: 50.0,
                defaultControl: PinsSimulators.SLIDER
            }),
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Window 3's Temperature",
                valueID : "temperature3",
                dataType: "float",
                minValue: 0.0,
                maxValue: 110.0,
                value: 50.0,
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
    temperature1: { type: "A2D" }, 
    temperature2: { type: "A2D" }, 
    temperature3: { type: "A2D" }, 

};