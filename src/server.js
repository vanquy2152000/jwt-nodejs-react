import express from "express";
import bodyParser from 'body-parser';
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
// import connection from "./config/connectDB";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

configViewEngine(app);

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// connection();
initWebRoutes(app);

app.listen(PORT, () => {
    console.log("JWT Backend is running on port = " + PORT);
});