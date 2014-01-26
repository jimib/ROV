$(document).ready(function(){
	//connect the socket
	var socket = io.connect("/");
	
	socket.on("connect", function(){
		console.log("connected");
	});
	
	socket.on("added", function(data){
		console.log("added: ", data);
		model.addController(data);
	});
	
	socket.on("removed", function(data){
		console.log("removed: ", data);
		model.removeController(data);
	});
	
	socket.on("disconnect", function(){
		console.log("disconnected");
	});
	
	
	var model = new RovModel();
	ko.applyBindings(model);

	//load the current list of connected controllers
	$.getJSON("/controllers", function(controllers){
		for(var i in controllers){
			model.addController(controllers[i]);
		}
	});

});

function RovModel(){
	
	var self = this;
	
	self.controllers = ko.observableArray([]);
}

RovModel.prototype.addController = function(data){
	var self = this;
	
	self.controllers.push(data);
}

RovModel.prototype.removeController = function(data){
	var self = this;
	//find the matching controller
	var controllers = self.controllers();
	for(var i = 0; i < controllers.length; i++){
		if(controllers[i].device == data.device){
			self.controllers.remove(controllers[i]);
			//stop the loop
			break;
		}
	}
}
