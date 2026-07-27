require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/db");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/api"));

async function startServer ()
{
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("server failed to start:", err.message);
    }
}

startServer();
