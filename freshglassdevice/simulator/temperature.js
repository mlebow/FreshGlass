//@module
// This is a BLL which represents a slider simulator for window temperature, between 32 and 90 degrees F.

var PinsSimulators = require('PinsSimulators');

exports.configure = function (config) {
    this.pinsSimulator = shell.delegate("addSimulatorPart", {
        header: {
            label: "Temperature",
            name: "Temperature",
            iconVariant: PinsSimulators.SENSOR_GUAGE
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

exports.read = function () {
    return this.pinsSimulator.delegate("getValue");
};

exports.write = function () {};

exports.close = function () {
    shell.delegate("removeSimulatorPart", this.pinsSimulator);
};

exports.pins = {
    weight: { type: "A2D" }
};