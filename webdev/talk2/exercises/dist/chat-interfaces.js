"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Types of events supported by the chat client.
 */
exports.ChatEventType = {
    /** Used by client and server to test the connection. */
    Echo: "echo",
    /** Sent by the client to the server when attempting to join the chat. */
    JoinRequest: "joinrequest",
    /** Sent by the server to the client when the server accepts the JoinRequest. */
    JoinAccepted: "joinaccepted",
    /** Sent by the server to the client when a new user joins. */
    UserJoined: "userjoined",
    /** Sent by the server to the client when a user disconnects. */
    UserExited: "userexited",
    /** Sent by the client to the server when sending a message. */
    MessageSent: "messagesent",
    /** Sent by the server to the client when a new message is received. */
    MessageReceived: "messagereceived"
};
//# sourceMappingURL=/home/sleepysort/proj/techtalks/webdev/talk2/exercises/dist/chat-interfaces.js.map