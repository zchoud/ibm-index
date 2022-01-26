var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('dotenv').config();
const commandDB = require("./command");
const db = new commandDB();

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

const { MONGODB_CONN_STRING } = process.env;
var port = process.env.PORT || 3000;
db.initialize(MONGODB_CONN_STRING).then(() => {
    app.listen(port);
});