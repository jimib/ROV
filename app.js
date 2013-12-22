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

io.sockets.on("connection", function(){
	console.log("controller connected");
	socket.on("added", function(data){
		io.emit("added", data);
	});
	
	socket.on("removed", function(data){
		io.emit("removed", data);
	});
	
	socket.on("update", function(data){
		io.emit("update", data);
	});
});

app.listen(config.port);