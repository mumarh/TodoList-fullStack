let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
require("dotenv").config();

const router = require("./APP/router/web/todoRouter");

let app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/website/todo", router);

// Port (fallback to 5000 if env is missing)
const PORT = process.env.PORT || 3000;

// Database connection + server start
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });
