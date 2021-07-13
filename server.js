const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const gpu_bot = require('./routes/gpu.routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


const db_uri = process.env.DATABASE_URI;

mongoose.connect(db_uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected!');
})

const gpuRouter = require('./routes/gpu.routes');

app.use('/gpus', gpuRouter);

app.listen(port, () => {
    console.log('Server Port: ' + port);
});