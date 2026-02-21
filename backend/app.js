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
const subjectRouter = require("./router/subject.route");
const galleryRouter = require("./router/gallery.route");
const loginRouter = require("./router/login.route");
const examRoute = require("./router/exam.route");
const testRoute = require("./router/test.route");
const skillRoute = require("./router/skill.route");
const questionsRoute = require("./router/question.route");

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

app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/admission", admissionRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/exams", examRoute);
app.use("/api/tests", testRoute);
app.use("/api/skills", skillRoute);
app.use("/api/questions", questionsRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
