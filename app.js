require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require("./db/connect")

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticationMiddleware = require("./middleware/authentication")

const authRouter = require("./routes/auth")
const jobRouter = require("./routes/jobs")


app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
    res.send('jobs api');
});


app.use(`/api/${process.env.API_VERSION}/auth`, authRouter)
app.use(`/api/${process.env.API_VERSION}/jobs`, authenticationMiddleware, jobRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
