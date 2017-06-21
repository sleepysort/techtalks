/**
 * Types of events supported by the chat client.
 */
export const ChatEventType = {
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
}

/**
 * Payload for a JoinRequest event.
 */
export interface JoinRequestData {
    username: string;
}

/**
 * Payload for a JoinAccepted event.
 */
export interface JoinAcceptedData {
    timestamp: number;
}

/**
 * Payload for a UserJoined event.
 */
export interface UserJoinedData {
    timestamp: number;
    username: string;
}

/**
 * Payload for a UserExited event.
 */
export interface UserExitedData {
    timestamp: number;
    username: string;
}

/**
 * Payload for a MessageSent event.
 */
export interface MessageSentData {
    username: string;
    message: string;
}

/**
 * Payload for a MessageReceived event.
 */
export interface MessageReceivedData {
    timestamp: number;
    username: string;
    message: string;
}