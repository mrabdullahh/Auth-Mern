const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
const ExpenseRouter = require("./routes/ExpenseRouter");
const ensureAuthenticated = require("./middlewares/Auth");
require("dotenv").config();
require("./config/db");
const PORT = process.env.PORT || 5000;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/expenses", ensureAuthenticated, ExpenseRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
