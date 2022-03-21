const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
const PORT = process.env.PORT;
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.listen(PORT, () => console.log(`Server runs on ${PORT}`));
