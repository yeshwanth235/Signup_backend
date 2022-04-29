const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const register = require("./routes/userLogin");

dotenv.config();
const mongoose_url = process.env.mongoose_url;

const app = express();

app.use(express.json());
app.use(cors());

//mongoose connection
mongoose
  .connect(mongoose_url)
  .then(() => {
    console.log("Mongoose is running successfully");
  })
  .catch((e) => {
    console.log(`Error in mongoose: ${e}`);
  });

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/", register);

const port = process.env.port || 3030;
app.listen(port, () => {
  console.log("Server running on the prot 3030");
});
