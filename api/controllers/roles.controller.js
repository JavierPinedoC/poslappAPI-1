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
    var priv = false;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
        console.log("params : ");
        var myRol = req.body;
        if(myRol.filtroPrivilegiosRol == 1)
            priv = true;
        else
            priv = false;
        console.log("Roles ... " + myRol);
    return Roles
      .create({
        nombreRol: myRol.nombreRol,
        filtroPrivilegiosRol: priv,
        }, {})
      .then((myRol) => {
        res.status(201).send(myRol);
        })
      .catch((error) => res.status(400).send(error));
    } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addRol.name, error, res);
    }
  }
//get (one)
function getRolById(req, res) {
    //console.log("operadores.controller getOperadorById");
    try {
      console.log(req.swagger.params.id.value);
      var id = req.swagger.params.id.value;
      console.log("Rol by id..." + parseInt(id));
      //console.log(gamesystems);
      Roles.findByPk(id)
        .then(myRol => {
          console.log(myRol);
          res.status(200).send(myRol);})
    } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, getRolById.name, error,res);
    }
}

//put
function updateRol(req, res) {
    var priv = false;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //console.log("operadores.controller getOperadorById");
    try {
        var id = req.swagger.params.id.value;
        console.log("params : " + id);
        var myUpdateRol = req.body;
        if(myUpdateRol.filtroPrivilegiosRol == 1)
            priv = true;
        else
            priv = false;
      console.log("update rol ... " + myUpdateRol.nombreRol + " " +
        myUpdateRol.filtroPrivilegiosRol);
      Roles.findByPk(id)
        .then(myRol => {
          //console.log("Result of findById: " + mygamesystem);
          if (!myRol) {
            res.status(401).send(({}));
          }
          return myRol
            .update({
              nombreRol: myUpdateRol.nombreRol,
              filtroPrivilegiosRol: priv,
             })
            .then(() => res.status(200).send(myRol) )
            .catch(error => res.status(403).send(myRol));
        })
    .catch(error => {
    console.log("There was an error: " + error);
    //resolve(error);
    });
    } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, updateRol.nombreRol, error, res);
    }
  }

module.exports = {
    getRoles,
    addRol,
    getRolById,
    updateRol,
    GS_CT_ERR_ROLES_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
  }