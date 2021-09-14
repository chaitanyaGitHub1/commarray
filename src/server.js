const { app, App } = require("./config/app");
const http = require("http").Server(app);
const { apiLogger } = require("./api/logger/logger.service");

// Add this to the VERY top of the first file loaded in your app
require("elastic-apm-node").start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: "commarray-backend",

  // Use if APM Server requires a token
  secretToken: "commarray-secret-token",

  // Use if APM Server uses API keys for authentication
  apiKey: "commarray-api-key",

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: "http://apm-server:8200",
});

class Server {
  static newServer() {
    return new Server();
  }

  constructor() {
    App.configureApp();
    this.configureServer();
  }

  configureServer() {
    const io = require("socket.io")(http);
    // Join chatroom
    socket.emit("joinGroup", { username, room });

    // Get group and users
    socket.on("groupUsers", ({ room, users }) => {
      outputRoomName(room);
      outputUsers(users);
    });

    // Message from server
    socket.on("message", (message) => {
      console.log(message);
      outputMessage(message);
    });

    try {
      http.listen(process.env.PORT, () =>
        apiLogger.info(
          `http listening on port ${process.env.PORT}`,
          "src\\server.js",
          "app.listen"
        )
      );
    } catch (error) {
      apiLogger.error(
        "Unable to start server",
        error,
        "src\\server.js",
        "app.listen"
      );
    }
  }
}

exports = Server.newServer();
