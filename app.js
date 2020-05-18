const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("DB connection established");
});
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error, ${err.message}`);
});

const taskRoutes = require("./routes/task");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use("/", taskRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => `Listening on port ${port}`);
