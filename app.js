// I am creating a server
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDb = require('./db/connect');

require('dotenv').config();

//middleware
app.use(express.static('./dist'));
app.use(express.json());

app.use('/api/v1/tasks',tasks);

// below if clent req invlid resource/ invalida route
app.all('*',(req,res) => {
    res.status(404).send('<h1>Route Does not exist</h1>');
});

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        console.log('DB connected');
        app.listen(PORT,() => console.log(`Server started on port ...${PORT}`))
    } catch (error) {
        console.log(error);
    }
}
start();