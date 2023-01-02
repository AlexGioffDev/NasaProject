const express = require('express');
const { httpGetAllLaunches, httpCreateLaunch, httpAbortLaunch } = require('./launches.controller');
const launchesRouter = express.Router();



/**
 * Method: GET
 * Accesibility: All
 * Path: /launches
 * Return: All Launches
 */
launchesRouter.get('/', httpGetAllLaunches)

/**
 * Method: POST
 * Accesibility: All
 * Path: /launches
 * Return: Create a Launch
 */
launchesRouter.post('/', httpCreateLaunch)

/**
 * Method: DELETE
 * Accesibility: All
 * Path: /launches/ID
 * Return: Abort a Launch by ID
 */
launchesRouter.delete("/:id", httpAbortLaunch)

module.exports = launchesRouter;