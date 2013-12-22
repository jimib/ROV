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

io.of("controller").on("connection", function(){
	console.log("controller connected");
	
	socket.on("added", function(data){
		io.of("client").emit("added", data);
	});
	
	socket.on("removed", function(data){
		io.of("client").emit("removed", data);
	});
	
	socket.on("update", function(data){
		io.of("client").emit("update", data);
	});
});

io.of("client").on("connection", function(){
	console.log("client connected");
});

app.listen(config.port);