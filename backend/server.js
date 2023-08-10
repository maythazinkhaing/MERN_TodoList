const express = require("express");
const dotenv = require("dotenv").config();
const color = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const port = process.env.PORT || 8000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/todos", require("./routes/todoRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server runs on port ${port}`));
