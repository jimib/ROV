var express = require("express"),
	path = require("path");
	
var app = express();
require("./lib/sockets")(app);

var config = require("./config.json");

app.configure(function(){
	app.set("view engine", "jade");
	
	app.use(require("./app/home"));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, "public")));
});

app.listen(config.port);