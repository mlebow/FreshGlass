//@module
// This is a BLL which represents a slider simulator for window temperature, between 32 and 90 degrees F.

var PinsSimulators = require('PinsSimulators');

exports.configure = function (config) {
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
        header: {
            label: "Temperature",
            name: "in Fahrenheit",
            iconVariant:PinsSimulators.SENSOR_SLIDER
        },
        axes: [
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Temperature",
                valueID : "temperature",
                dataType: "float",
                minValue: 32.0,
                maxValue: 90.0,
                value: 32.0,
                defaultControl: PinsSimulators.SLIDER
            }),
        ]
    });
};

var read = exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return axes.temperature;
}

exports.write = function () {};

exports.close = function () {
    shell.delegate("removeSimulatorPart", this.pinsSimulator);
};

exports.pins = {
    temperature: { type: "A2D" }
};