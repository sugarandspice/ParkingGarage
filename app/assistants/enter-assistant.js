
function EnterAssistant(sceneAssistant, callBackFunc){
	this.sceneAssistant = sceneAssistant;
	this.callBackFunc = callBackFunc;
};

EnterAssistant.prototype.intPickerModel = {value : null};

EnterAssistant.prototype.setup = function(widget){
	this.widget = widget;
	this.intPickerModel.value = 4;
	this.sceneAssistant.controller.setupWidget('pkrIntLevel', {label: "Select level:", min: 3, max:8 } , this.intPickerModel);
	this.sceneAssistant.controller.setupWidget('btnEnterInt',{}, { label: "Save Level"});
	this.sceneAssistant.controller.listen('btnEnterInt', Mojo.Event.tap, this.onSaveLevel.bind(this));	
};

EnterAssistant.prototype.cleanup = function() {
	this.sceneAssistant.controller.stopListening('btnEnterInt', Mojo.Event.tap, function(){});    
};

EnterAssistant.prototype.onSaveLevel = function(){
	this.callBackFunc(this.intPickerModel.value);
	this.widget.mojo.close();
};