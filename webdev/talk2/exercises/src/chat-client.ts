/**
 * WebDev Talk 2 Exercise: Building a chat client
 * 
 * We are going to build a chat client that communicates with a server, using
 * socket.io for communication.
 * 
 * Further instructions and guidance starting on line 41.
 * 
 * Do not modify the code between lines 14 and 40, though you may read over them
 * if you're interested. The code has been commented for comprehensibility.
 */

//
////////// BEGIN: DO NOT EDIT //////////

// Here we import the modules we need: socket.io-client, as well as some pre-defined
// interfaces and event types.
import * as socketio from "socket.io-client";
import * as readline from "readline";
import {
    ChatEventType,
    JoinRequestData,
    JoinAcceptedData,
    UserJoinedData,
    UserExitedData,
    MessageReceivedData,
    MessageSentData
} from "./chat-interfaces";

// Check the command line arguments, to ensure that a server url has been given.
if (process.argv.length !== 3) {
    console.log("Incorrect number of arguments:");
    console.log("    Usage: npm start -- SERVER_URL");
    process.exit(0);
}

// Assign the given command line argument to be serverAddr
const serverAddr = process.argv[2];

////////// END: DO NOT EDIT //////////

/**
 * This is the socket object that we will use to communicate with the server.
 * there are two methods on this object that we will be concerned with:
 *
 *     io.on(EVENT_TYPE, CALLBACK)
 *         This attaches a CALLBACK for the given EVENT_TYPE. Whenever you receive a message
 *         from the server of a given EVENT_TYPE, your CALLBACK will be called with the
 *         corresponding data interface.
 *         The EVENT_TYPEs you can expect *from* the server are:
 *             - ChatEventType.JoinAccepted      When a new user joins the server.
 *             - ChatEventType.UserJoined        When a new user joins the server.
 *             - ChatEventType.UserExited        When a user leaves the server.
 *             - ChatEventType.MessageReceived   When a new message is received.
 *             - ChatEventType.Echo              What the server will reply with when you emit an 'Echo'.
 * 
 *     io.once(EVENT_TYPE, CALLBACK)
 *         Same as io.on(), but will only call the CALLBACK once, and detach from the event afterwards.
 * 
 *     io.emit(EVENT_TYPE, DATA)
 *         This sends DATA to the server with the given EVENT_TYPE. The server will process
 *         the DATA appropriately, assuming that it is the correct data type.
 *         the EVENT_TYPEs you can send *to* the server are:
 *             - ChatEventType.JoinRequest       When you wish to join the server.
 *             - ChatEventType.MessageSent       When you want to send a chat message to the server.
 *             - ChatEventType.Echo              When you want to test the connection; server will reply with an echo.
 * 
 * Go to https://socket.io/docs/client-api/ for more details.
 */
const io = socketio(serverAddr);

/**
 * This is the readline interface object that we will use to read from the console's standard in.
 * The readline interface also uses an event driven pattern. The methods we might want to use include:
 * 
 *     rl.on(EVENT_TYPE, CALLBACK)
 *         This attaches a CALLBACK for the given EVENT_TYPE.
 *         The only event you should be concerned with for the exercise is "line", which will be 
 *         when a line from stdin is entered. The CALLBACK will be called with the line string.
 * 
 *     rl.question(PROMPT, CALLBACK)
 *         Prints the given PROMPT string to the console and waits for a response from stdin. Calls the
 *         CALLBACK with the user's response via stdin.
 * 
 * Go to https://nodejs.org/api/readline.html#readline_class_interface for more details.
 */
const rl = readline.createInterface(process.stdin);

/**
 * Start writing your code below. There is a code snippet (commented out) to help you get started.
 * Note: Send the JoinRequest to the server AFTER you set up all of your listeners.
 */

// io.on(ChatEventType.Echo, (data: string) => {
//     console.log(data);
// });

// rl.on("line", (line: string) => {
//     io.emit(ChatEventType.Echo, line);
// });