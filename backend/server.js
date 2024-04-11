const express = require("express");

const cors = require("cors");

require("dotenv").config();
const connectDB = require("./db/index");
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use("/university", require("./routes/authRoute"));

app.use("*", (req, res) => {
  res.send("route not found");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Is Running At PORT: ${PORT}`);
  }
});
