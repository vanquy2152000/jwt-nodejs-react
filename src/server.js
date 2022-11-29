import express from "express";
import bodyParser from 'body-parser';
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

configViewEngine(app);

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

initWebRoutes(app);

app.listen(PORT, () => {
    console.log("JWT Backend is running on port = " + PORT);
});