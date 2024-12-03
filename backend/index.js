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

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use("/uploads", express.static("/var/data/uploads"));
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   const __dirname = path.resolve();
//   app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
