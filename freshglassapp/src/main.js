//@program


//This does device discovery
var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("freshglassdevice");
	},
	onQuit: function(application) {
		application.forget("freshglassdevice");
	},
})


application.behavior = new ApplicationBehavior();
application.add(new Container());  //Was automatically generated with the new file