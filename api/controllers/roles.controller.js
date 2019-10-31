'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
const { Roles } = require('../models'); // Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Roles Controller]';

// Error Messages
const GS_CT_ERR_ROLES_NOT_FOUND = 'ROLES not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'ROLES deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

// get (all)
function getRoles(req, res) {
  try {
    console.log("Roles...");
    console.log(Roles);
    Roles.findAll({
    /*include: [{
    model: orderstatus
    }]
    include: [{ all: true, nested: true }]*/
    })
    .then((consoles) => {
      console.log(consoles);
      res.status(200).send(consoles);
    
    }, (error) => {
      res.status(500).send(error);
    });
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getRoles.name, error, res);
  }
}

// post
function addRol(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
      console.log("params : ");
      var myRol = req.body;
      console.log("gamesystems ... " + myRol);
    return Roles
      .create({
        nombreRol: myRol.nombreRol,
        filtroPrivilegiosRol: myRol.filtroPrivilegiosRol,
        }, {
        /* include: [{
        model: order_detail,
        as: 'orderdetail'
        }] */
        })
      .then((myRol) => {
        res.status(201).send(myRol);
        })
      .catch((error) => res.status(400).send(error));
    } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addRol.name, error, res);
    }
  }

module.exports = {
    getRoles,
    addRol,
    GS_CT_ERR_ROLES_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
  }