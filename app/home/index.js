var express = require("express"),
	path = require("path");

var app = module.exports = express();

app.set("views", path.join(__dirname, "views"));

app.all("/", function(req, res, next){
	res.render("home");
});