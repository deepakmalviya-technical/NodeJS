const { dbUrl } = require('./url');
const mongoose = require('mongoose');

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false })
    .then(db => {
        console.log('DataBase Connected Successfully...');
    }).catch(error => {
        console.log('Error To Connect DataBase !!', error);
    })