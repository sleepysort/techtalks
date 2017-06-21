import { createServer } from "http";
import * as socketio from "socket.io";
import * as Chat from "./chat-interfaces";

const app = createServer();
const io = socketio(app);
const roomName = "default-room";

app.listen(4000);

io.on("connection", (socket: SocketIO.Socket) => {
    socket.once(Chat.ChatEventType.JoinRequest, (joinData: Chat.JoinRequestData) => {
        socket.join(roomName);
        const username = joinData.username;

        socket.on(Chat.ChatEventType.MessageSent, (chatData: Chat.MessageSentData) => {
            const data: Chat.MessageReceivedData = {
                timestamp: Date.now(),
                username: chatData.username,
                message: chatData.message
            };
            io.in(roomName).emit(Chat.ChatEventType.MessageReceived, data);
        });

        socket.once("disconnect", () => {
            socket.leaveAll();
            const data: Chat.UserExitedData = {
                timestamp: Date.now(),
                username
            };
            io.in(roomName).emit(Chat.ChatEventType.UserExited, data);
        });

        const data: Chat.UserJoinedData = {
            timestamp: Date.now(),
            username
        };

        socket.emit(Chat.ChatEventType.JoinAccepted, { timestamp: Date.now() });
        io.in(roomName).emit(Chat.ChatEventType.UserJoined, data);
    });
});