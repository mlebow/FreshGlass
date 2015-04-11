//@module
// This is a BLL which represents a slider simulator for window brightness, between 0 (no sun) and 1 (max sun)

var PinsSimulators = require('PinsSimulators');

exports.configure = function (config) {
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
        header: {
            label: "Brightness of window",
            name: "Brightness of window",
            iconVariant: PinsSimulators.SENSOR_SLIDER
        },
        axes: [
            new PinsSimulators.AnalogInputAxisDescription({
                ioType: "input",
                valueLabel : "Brightness",
                valueID : "brightness",
                dataType: "float",
                minValue: 0.0,
                maxValue: 1.0,
                value: 0.0,
                defaultControl: PinsSimulators.SLIDER
            }),
        ]
    });
};

var read = exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return axes.brightness;
}

exports.write = function () {};

exports.close = function () {
    shell.delegate("removeSimulatorPart", this.pinsSimulator);
};

exports.pins = {
    brightness: { type: "A2D" }
};