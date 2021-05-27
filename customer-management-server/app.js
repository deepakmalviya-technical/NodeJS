//  Constant Variables for ENV file
require('dotenv').config();

// Database Connection
require('./config/db');

const cors = require('cors');
const express = require('express');
const app = express();
const customerRouter = require('./routes/customerRouter');

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));
app.use('/', customerRouter);

// Server 
const port = process.env.PORT || 5000;
app.listen(port, (server, err) => {
    if (err) {
        console.log('Error To Creating Server');
    } else {
        console.log(`Server is Running On Port ${port}`);
    }
})