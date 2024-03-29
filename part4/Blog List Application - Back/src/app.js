const express = require("express");
const app = express();
const cors = require("cors");
const config = require("../utils/config");
const mongoose = require("mongoose");
const blogsRouter = require("../controllers/blogs");
const middleware = require("../utils/middleware");
const userRouter = require("../controllers/users");

const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(middleware.errorHandler)

module.exports = app;
