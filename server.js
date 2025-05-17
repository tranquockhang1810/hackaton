const express = require('express');
const http = require("http");
const cors = require('cors');
require('dotenv').config();
const { initializeSocket } = require("./sockets/socket");
const ResponseFormatter = require('./utils/ResponseFormatter.js');


//DATABASE
require('./db/mongo.db.js');

//SERVER
const app = express();

//CORS
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptionsDelegate));

//routes
app.use(require("./routes/index"));

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json(ResponseFormatter.error(message, status));
});

//WebSocket
const server = http.createServer(app);
initializeSocket(server);

server.listen(process.env.PORT, "0.0.0.0", () =>
  console.log(`Hackaton Chat App is listening on port ${process.env.PORT}!`)
);