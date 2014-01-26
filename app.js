var express = require("express"),
	path = require("path");
	
var app = express();
var io = require("./lib/sockets")(app);

var config = require("./config.json");

app.configure(function(){
	app.set("view engine", "jade");
	
	app.use(require("./app/home"));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, "public")));
});

var controllers = [];
io.sockets.on("connection", function(socket){
	
	var icontrollers = {};
	socket.on("added", function(data){
		console.log("added", data);
		if(addController(data)){
			//make note of the device this socket contributed
			icontrollers[data.device] = data;
			//notify all
			io.sockets.emit("added", data);
		}
	});
	
	socket.on("removed", function(data){
		
		if(removeControllerById(data.device)){
			//delete note of the device this socket contributed
			delete icontrollers[data.device];
			//notify all
			io.sockets.emit("removed", data);
		}
		
	});
	
	socket.on("update", function(data){
		//pass this information onto the serial socket
		io.sockets.emit("update", data);
	});
	
	socket.on("disconnect", function(){
		//remove all the devices listed against this socket
		for(var id in icontrollers){
			var data = icontrollers[id];
			if(removeControllerById(data.device)){
				//notify all
				io.sockets.emit("removed", data);
			}
		}
	});
});

function addController(data){
	if(getControllerIndexById(data.device) == -1){
		controllers.push(data);
		return true;
	}
	
	return false;
}

function getControllerIndexById(id){
	for(var i = 0; i < controllers.length; i++){
		if(controllers[i].device == id){
			return i;
		}
	}
	
	return -1;
}

function removeControllerById(id){
	var index = getControllerIndexById(id);
	if(index > -1){
		controllers.splice(index, 1);
		return true;
	}
	
	return false;
}

app.get("/controllers", function(req, res, next){
	res.send(controllers);
})

app.listen(config.port);
