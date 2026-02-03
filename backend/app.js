const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5001;
const ConnectDB = require("./config/db");

const app = express();
const cors = require("cors");
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// global.io = io;
// =======================Route Require======================
const userRouter = require("./router/user.route");
const admissionRouter = require("./router/admission.route");

// ===================MiddleWere=====================
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// =============DB Connection================
ConnectDB();

// io.on("connection", (socket) => {
//   console.log("New socket connection:", socket.id);

//   // School room join
//   socket.on("join-school", ({ school }) => {
//     socket.join(school);
//     console.log(`Socket ${socket.id} joined school room: ${school}`);
//   });

//   // User-specific room join
//   socket.on("join-user", ({ userId }) => {
//     socket.join(`user-${userId}`);
//     console.log(`Socket ${socket.id} joined user room: user-${userId}`);
//   });

//   // Leave rooms
//   socket.on("leave-school", ({ school }) => {
//     socket.leave(school);
//   });

//   socket.on("leave-user", ({ userId }) => {
//     socket.leave(`user-${userId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// });

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(userRouter);
app.use(admissionRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
