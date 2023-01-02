const mongoose = require('mongoose');


const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    destination: {
        type: String,
    },
    customers: {
        type: [String],
        required: true,
    },
    upcoming: {
        type: Boolean,
        default: true,
        required: true
    },
    success: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = mongoose.model("Launch", launchesSchema)