let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");   
require("dotenv").config();
const router = require("./APP/router/web/todoRouter");

let app = express();

app.use(express.json());
app.use(cors());

app.use("/api/website/todo", router);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Database connected ✅");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error ❌", err);
  });
