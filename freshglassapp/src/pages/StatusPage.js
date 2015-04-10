//@module

var StatusPage = function (window, previousPage, switchPages) {
    this.window = window;
    this.previousPage = previousPage;
    this.switchPages = switchPages;
    this.container = null;
};

/**
 * Return the kinoma Container which will be added to the application when this
 * page becomes active.
 */
StatusPage.prototype.getContainer = function () {
    if (this.container) { return this.container; }

    var container = new Container({top: 0, left: 0, bottom: 0, right: 0, skin: new Skin({fill: "pink"})});

    this.container = container;
    return this.container; // TODO: implement
};

module.exports = StatusPage;