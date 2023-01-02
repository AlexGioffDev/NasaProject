const {getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    const {skip, limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpCreateLaunch(req, res) {
    const launch = req.body;

    if(!launch.mission 
        || !launch.rocket 
        || !launch.launchDate
        || !launch.destination)
        {
            return res.status(400).json({
                error: "Error! Missing data!"
            })
        }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate))
    {
        return res.status(400).json({
            error: "Error! Invalid Date"
        })
    }

    await scheduleNewLaunch(launch);

    res.status(201).json(launch)
}

async function httpAbortLaunch(req, res) {
    const launchID = Number(req.params.id);
    
    const existLaunch = await existsLaunchWithId(launchID)
    
    if(!existLaunch)
    {
        return res.status(404).json({
            error: "Launch not found"
        })
    }
    const aborted = await abortLaunchById(launchID);
   if(!aborted){
    return res.status(404).json({
        error: "Launch not aborted"
    })
   }

   return res.status(200).json({
    ok: true
})
}



module.exports = {
    httpGetAllLaunches,
    httpCreateLaunch,
    httpAbortLaunch
}