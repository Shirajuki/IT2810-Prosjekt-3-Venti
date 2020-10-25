const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const adminRoute = require('./routes/admin');
const fs = require('fs');
const app = express();
const url = 'mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db';

app.use(cors());

//app.set('view engine', 'ejs');
app.set('views', './src/pages');

app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(`${__dirname}/public`)));

const port = process.env.PORT || 8080;

const useMockDatabase = false;

if (useMockDatabase) {
    app.get('/', (_, res) => {
        const path = '../mock-data/index.json'
        fs.readFile(path, (err, json) => {
            try {
                res.json(JSON.parse(json))
            } catch (ex) {
                res.json({})
            }
        })
    })
    app.get('/:file', ({params:{file}}, res) => {
        const path = '../mock-data/' + file + ".json"
        console.log(path)
        fs.readFile(path, (err, json) => {
            try {
                res.json(JSON.parse(json))
            } catch (ex) {
                res.json({})
            }
        })
    })
    app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
} else {
    app.use('/', adminRoute);
    mongoose
        .connect(url, { 
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        })
        .then(() => {
            app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
        })
        .catch((err) => {
            console.log(err);
        });
}