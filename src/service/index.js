const express = require("express");
const lokijs = require("lokijs");
const db = new lokijs("TangoProject");
global.users = db.addCollection("users");
dbInit();
const app = express();
const server = require("http").createServer(app);
global.io = require("socket.io")(server, { cors: { origin: "*" } });
const routes = require("./routes/routes");

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function dbInit() {
  users.insertOne({ email: "admin@tango", password: "admin" });
}

app.use(routes);

server.listen(8080);
