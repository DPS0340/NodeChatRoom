var http = require('http');
var fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
var app = http.createServer(function(request,response) {
    var url = request.url;
    if(request.url === '/'){
        url = '/index.html';
    }
    if(request.url === '/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});
app.listen(8000);
var conns = [];
wss.on('connection', function (ws) {
    conns.push(ws);
    ws.on('message', function (message) {
        console.log(message);
        for(var i=0;i<conns.length;i++) {
            conns[i].send(message);
        }
    });
});