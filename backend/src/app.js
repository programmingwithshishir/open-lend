import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from "dotenv";
import session from "express-session";
import passport from './configs/passport.js';
import GoogleAuthRoutes from "./routes/auth.routes.js";

const app = express();
const server = createServer(app);
dotenv.config();
app.use(express.json());
//CORS configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

//session middleware configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    })
);

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//home route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use("/auth", GoogleAuthRoutes);

//listening to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});