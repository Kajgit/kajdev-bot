const { model, Schema } = require("mongoose");

let afkSchema = new Schema({
    Guild: String,
    UserID: String,
    Afk: Boolean
});

module.exports = model("AFK", afkSchema); 