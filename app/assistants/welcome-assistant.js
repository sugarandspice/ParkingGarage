function WelcomeAssistant() {};

WelcomeAssistant.prototype.levelCookie = null;

WelcomeAssistant.prototype.setup = function() {
    this.levelCookie = new Mojo.Model.Cookie("levelValue");
    
    this.controller.setupWidget("btnEnter", {}, {label: "Enter Level"});
    this.controller.setupWidget("btnReset", {}, {label: "Reset Level"});
    
    Mojo.Event.listen(this.controller.get("btnEnter"), Mojo.Event.tap, this.enterNewLevel.bind(this));
    Mojo.Event.listen(this.controller.get("btnReset"), Mojo.Event.tap, this.resetLevel.bind(this));    
};

WelcomeAssistant.prototype.toggleView = function(){
    this.controller.showAlertDialog({
        onChoose: function(invalue) {},
        title: "Enter Level",
        message: "This is where you enter the level",
        choices: [ {label : "Ok", value : ""}]
    });
};

WelcomeAssistant.prototype.activate = function(event) {
    this.evaluateState();
};

WelcomeAssistant.prototype.deactivate = function(event) {};

WelcomeAssistant.prototype.cleanup = function(event) {};

WelcomeAssistant.prototype.resetLevel = function(){
  this.levelCookie.put("");
  this.evaluateState();
};

WelcomeAssistant.prototype.enterNewLevel = function(tapEvent) {
    tapEvent.stop;
	this.controller.showDialog({
		template : "welcome/enter-dialog",
		assistant : new EnterAssistant(this, this.saveLevel.bind(this)),
		preventCancel : false
	});
};

WelcomeAssistant.prototype.saveLevel = function(levelInt) {
    this.levelCookie.put(levelInt);
    this.evaluateState();
};

WelcomeAssistant.prototype.evaluateState = function(){
    var levelValue = this.levelCookie.get();
    if (levelValue) {
        Mojo.Log.info("The cookie has a value of " + levelValue);
        $("txtDisplayLevel").innerHTML = "You are parked on level: " + levelValue;
        $("btnEnter").hide();
        $("btnReset").show();
    }else {
        Mojo.Log.info("The cookie does not have a value.");
        $("txtDisplayLevel").innerHTML = "Press enter to save the level.";
        $("btnEnter").show();
        $("btnReset").hide();
    }    
};
