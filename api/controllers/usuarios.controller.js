'use strict';

var _ = require('lodash');
const { Usuarios } = require('../models'); // Sequelize

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var UsuariosService = require('../services/Usuarios.service');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Usuarios Controller]';

// Error Messages
const GS_CT_ERR_Usuarios_NOT_FOUND = 'Usuarios not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Usuarios deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getUsuarios(req, res) {

    try {
        console.log("Usuarios...");
        console.log(Usuarios);
        Usuarios.findAll({
        /*include: [{
        model: orderstatus
        }]
        include: [{ all: true, nested: true }]*/
        })
        .then((consoles) => {
        console.log(consoles);
        res.status(200).send(consoles);
        //utils.writeJson(res, consoles);
        }, (error) => {
        res.status(500).send(error);
        });
        } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsuarios.name, error, res);
        }
}

function getUsuariosByPk(req, res) {

    try {
        console.log(req.swagger.params.id.value);
        var id = req.swagger.params.id.value;
        console.log("usuarios by id..." + id);
        //console.log(gamesystems);
        Usuarios.findByPk(id)
        .then(mygamesystem => {
        console.log(mygamesystem);
        res.status(200).send(mygamesystem);})
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsuariosByPk.name, error,
        res);
    }
}

function createUsuarios(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
        console.log("params : ");
        var mygamesystem = req.body;
        console.log("Usuarios ... " + mygamesystem);
        return Usuarios
        .create({
            nombreUsuario: mygamesystem.Nombre_Usuario,
            apellido: mygamesystem.Apellido,
            email: mygamesystem.Email,
            password: mygamesystem.Password,
            fechaNacimiento: mygamesystem.Fecha_De_Nacimiento,
            telefono: mygamesystem.Telefono
    }, {
        /* include: [{
            model: order_detail,
            as: 'orderdetail'
        }] */
    })
    .then((mygamesystem) => {
    res.status(201).send(mygamesystem);
})
    .catch((error) => res.status(400).send(error));
} catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, createUsuarios.name, error, res);
}  
}

function updateUsuarios(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
    console.log("params : " + id);
    var myupdategamesystem = req.body;
    console.log("update gamesystems ... " + myupdategamesystem.nombreUsuario + " " + myupdategamesystem.apellido);
    Usuarios.findByPk(id)
    .then(mygamesystem => {
      console.log("Result of findById: " + mygamesystem);
      if (!mygamesystem) {
        res.status(401).send(({}));
      }
    return mygamesystem
    .update({
        nombreUsuario: myupdategamesystem.Nombre_Usuario,
        apellido: myupdategamesystem.Apellido,
        email: myupdategamesystem.Email,
        password: myupdategamesystem.Password,
        fechaNacimiento: myupdategamesystem.Fecha_De_Nacimiento,
        telefono: myupdategamesystem.Telefono
    })
    .then(() => res.status(200).send(mygamesystem) )
      .catch(error => res.status(403).send(mygamesystem));
    })
    .catch(error => {
      console.log("There was an error: " + error);
      //resolve(error);
    });
} catch (error) {
  console.log("Was an error");
  controllerHelper.handleErrorResponse(MODULE_NAME, updateUsuarios.name, error, res);
}
}

/*function deleteUsuarios(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
  Usuarios.findByPk(id)
  .then(mygamesystem => {
    console.log("Result of findById: " + mygamesystem);
    if (!mygamesystem) {
      res.status(200).send({"success": 0, "description":"not found !"});
    }
    else{
      return mygamesystem
      .destroy()
      .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
      .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
    }
})
.catch(error => {
  console.log("There was an error: " + error);
});
}
*/
module.exports = {
  getUsuarios,
  getUsuariosByPk,
  createUsuarios,
  updateUsuarios,
  //deleteUsuarios,
  GS_CT_ERR_Usuarios_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}