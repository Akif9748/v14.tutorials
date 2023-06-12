const mongoose = require('mongoose');

module.exports = mongoose.model("User", new mongoose.Schema({
    id: String,
    registeredAt: { type: Date, default: Date.now },
}));