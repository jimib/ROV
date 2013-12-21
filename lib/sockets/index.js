var http = require('http'),
	socketIO = require('socket.io');


module.exports = function(app){
	var server = http.createServer(app), 
		io = socketIO.listen(server, {log: false, transports: ["flashsocket", "websocket", "htmlfile", "xhr-polling", "jsonp-polling"]});
	
	var _listen = app.listen;
		
	app.listen = function(port){
		server.listen(port);
		return server;
	}
		
	return io;
}
