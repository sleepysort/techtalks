import { createServer } from "http";
import * as socketio from "socket.io";
import * as Chat from "./chat-interfaces";

const app = createServer();
const io = socketio(app);
const roomName = "default-room";
const port = 4000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

io.on("connection", (socket: SocketIO.Socket) => {
    console.log(`Received new connection: ${socket.id}`);

    socket.on(Chat.ChatEventType.Echo, (echoData: any) => {
        console.log(`Received 'Echo' from ${socket.id}: ${echoData}`);
        socket.emit(Chat.ChatEventType.Echo, echoData);
    });

    socket.once(Chat.ChatEventType.JoinRequest, (joinData: Chat.JoinRequestData) => {
        socket.join(roomName);
        const username = joinData.username;
        console.log(`Received 'JoinRequest' from ${socket.id}: ${username}`);

        socket.on(Chat.ChatEventType.MessageSent, (chatData: Chat.MessageSentData) => {
            console.log(`Received 'MessageSent' from ${socket.id}: ${username} : ${chatData.message}`);
            const data: Chat.MessageReceivedData = {
                timestamp: Date.now(),
                username: chatData.username,
                message: chatData.message
            };
            io.in(roomName).emit(Chat.ChatEventType.MessageReceived, data);
        });

        socket.once("disconnect", () => {
            console.log(`Received 'disconnect' from ${socket.id}: ${username}`);
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