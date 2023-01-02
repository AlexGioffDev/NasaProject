const mongoose = require('mongoose');

require('dotenv').config();

const MONGOURL = process.env.MONGO_URL


mongoose.connection.once("open", () => {
    console.log("MongoDB Connection ready");
})


mongoose.connection.on("error", (err) => {
    console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGOURL);
}


async function mongoDisconect() {
   await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconect
}