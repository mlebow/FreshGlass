//@module

var MainPage = function (switchPages) {
    this.switchPages = switchPages;
    this.container = null;
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
MainPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }

    var headerBar = new Label({
        left: 0, right: 0, height: 40,
        skin: new Skin({fill: "red"}),
        style: new Style({color: "white"}),
        string: "Fresh Glass"
    });

    var rootContainer = new Column({
        top: 0, left: 0, right: 0, bottom: 0,
        contents: [
            headerBar
        ]
    });

    this.container = rootContainer;
    return this.container; // TODO: implement
};

module.exports = MainPage;