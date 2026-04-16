require("dotenv").config();
const express = require("express");

const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(express.json());

// Routes
app.use("/", schoolRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});