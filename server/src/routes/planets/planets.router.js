const express = require('express');
const planetsRouter = express.Router();
const {httpGetAllPlanets} = require('./planets.controller');

/**
 * Method: GET
 * Accesibility: All
 * Path: /planets
 * Return: All Planets
 */
planetsRouter.get('/', httpGetAllPlanets);


module.exports = planetsRouter