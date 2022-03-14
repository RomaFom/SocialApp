const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.listen(PORT, () => console.log(`Server runs on ${PORT}`));
