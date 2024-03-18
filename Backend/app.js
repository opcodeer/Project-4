const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");
const userRouter = require('./routes/users.js');
const sendOtp = require('./routes/sendOtp.js');

const app = express();
const port = 8000;
const server = http.createServer(app);

const io = new Server(server, {
    maxHttpBufferSize: 1e7,
    cors: {
        origin: ["http://localhost:3000", "https://490bj8xz-3000.inc1.devtunnels.ms", "https://490bj8xz-8080.inc1.devtunnels.ms"],
        methods: ["GET", "POST"]
    },
    transports: ['websocket']
});

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/userinfo');
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("Error occurred: " + error);
    }
}
connectToDatabase();

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const corsOptions = {
    origin: ["http://localhost:3000", "https://490bj8xz-3000.inc1.devtunnels.ms", "https://490bj8xz-8080.inc1.devtunnels.ms"],
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/otpVerification", sendOtp);

server.listen(port, () => {
    console.log(`The application successfully started on port ${port}`);
});
