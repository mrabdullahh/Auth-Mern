const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URI;
mongoose
  .connect(mongo_url)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("Mongodb Connection Error", err));
