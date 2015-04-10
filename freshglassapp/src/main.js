//@program

// var currentPage = new Page();
// var nextPage = new EditPage(currentWindow, currentPage, switchPages);

var MainPage = require("pages/MainPage");
var currentPage = null; // global

var switchPages = function(nextPage) {
    if (currentPage !== null) {
        application.remove(currentPage.getContainer());
    }
    currentPage = nextPage;
    application.add(nextPage.getContainer());
};

var mainPage = new MainPage(switchPages);
switchPages(mainPage);
