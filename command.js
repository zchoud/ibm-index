const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commands = new Schema({
    cmd: String,
    name: String,
    description: String,
    keywords: [{
        word: String
    }]
});

module.exports = class commandDB {
    constructor() {
        this.Command = null;
    }

    initialize(connectionString) {
        return new Promise((resolve, reject) => {
            const db = mongoose.createConnection(
                connectionString, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            );
            db.once('error', (err) => {
                reject(err);
            });
            db.once('open', () => {
                this.Command = db.model("commands", commands);
                resolve();
            });
        });
    }
}