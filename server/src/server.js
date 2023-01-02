// Llamando Modulos Installado y creaado
const http = require('http');
require('dotenv').config();
const app = require('./app');
const { mongoConnect } = require('./services/mongo')

const { loadPlanetsData } = require('./models/planets.model')
const { loadLaunchesData } = require('./models/launches.model');



// Variables
const PORT = process.env.PORT || 8000;



const server = http.createServer(app);



async function startServer() {

    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();
    // Check si el server es partido sin problema
    server.listen(PORT, () => console.log(`We are listening on PORT: ${PORT}`));
}

startServer();









