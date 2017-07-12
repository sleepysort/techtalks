"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socketio = require("socket.io");
var Chat = require("./chat-interfaces");
var app = http_1.createServer();
var io = socketio(app);
var roomName = "default-room";
var port = 4000;
app.listen(port, function () {
    console.log("Server listening on port " + port + ".");
});
io.on("connection", function (socket) {
    console.log("Received new connection: " + socket.id);
    socket.on(Chat.ChatEventType.Echo, function (echoData) {
        if (!echoData) {
            socket.emit(Chat.ChatEventType.Echo, undefined);
            return;
        }
        console.log("Received 'Echo' from " + socket.id + ": " + echoData);
        socket.emit(Chat.ChatEventType.Echo, echoData);
    });
    socket.once(Chat.ChatEventType.JoinRequest, function (joinData) {
        if (!joinData) {
            return;
        }
        socket.join(roomName);
        var username = joinData.username;
        console.log("Received 'JoinRequest' from " + socket.id + ": " + username);
        socket.on(Chat.ChatEventType.MessageSent, function (chatData) {
            if (!chatData) {
                return;
            }
            console.log("Received 'MessageSent' from " + socket.id + ": " + username + " : " + chatData.message);
            var data = {
                timestamp: Date.now(),
                username: chatData.username,
                message: chatData.message
            };
            io.in(roomName).emit(Chat.ChatEventType.MessageReceived, data);
        });
        socket.once("disconnect", function () {
            console.log("Received 'disconnect' from " + socket.id + ": " + username);
            socket.leaveAll();
            var data = {
                timestamp: Date.now(),
                username: username
            };
            io.in(roomName).emit(Chat.ChatEventType.UserExited, data);
        });
        var data = {
            timestamp: Date.now(),
            username: username
        };
        socket.emit(Chat.ChatEventType.JoinAccepted, { timestamp: Date.now() });
        io.in(roomName).emit(Chat.ChatEventType.UserJoined, data);
    });
});
//# sourceMappingURL=/home/sleepysort/proj/techtalks/webdev/talk2/exercises/dist/chat-server.js.map