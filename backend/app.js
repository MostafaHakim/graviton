const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 5001;
const ConnectDB = require("./config/db");

const app = express();
const cors = require("cors");
const server = http.createServer(app);

// =======================Route Require======================
const userRouter = require("./router/user.route");
const admissionRouter = require("./router/admission.route");

// ===================MiddleWere=====================

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// =============DB Connection================
ConnectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(userRouter);
app.use(admissionRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
