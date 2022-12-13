require("dotenv").config();
import express from "express";
import bodyParser from 'body-parser';
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import configCors from "./config/configCors";
import initApiRoutes from './routes/api';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);

configViewEngine(app);

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// config cookie
app.use(cookieParser())

// connection();
initWebRoutes(app);
initApiRoutes(app);

// req => middleware => res

app.use((req, res) => {
    return res.send("404 Not Found")
})

app.listen(PORT, () => {
    console.log("JWT Backend is running on port = " + PORT);
});