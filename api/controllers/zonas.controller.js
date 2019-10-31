'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var zonasService = require('../services/zonas.service');

const { Zonas } = require('../models'); //Sequelize
////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Zonas Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getZonas(req, res) {

    try {
        console.log("Zonas...");
        console.log(Zonas);
        Zonas.findAll({
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
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsers.name, error, res);
    }
}

function addZonas(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
        console.log("params : ");
        var myZonas = req.body;
        console.log("zonass ... " + myZonas);
        return Zonas
            .create({
                nombreZona: myZonas.nombreZonas
            }, {
                /* include: [{
                model: order_detail,
                as: 'orderdetail'
                }] */
            })
            .then((myZonas) => {
                res.status(201).send(myZonas);
            })
            .catch((error) => res.status(400).send(error));
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, addZonas.nombreZonas, error, res);
    }
}

function getZonasById(req, res) {

    try {
        console.log(req.swagger.params.id.value);
        var id = req.swagger.params.id.value;
        console.log("zonas by id..." + id);
        //console.log(zonass);
        Zonas.findByPk(id)
            .then(myzonas => {
                console.log(myzonas);
                res.status(200).send(myzonas);
            })
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getZonasById.name, error,
            res);
    }
}

// function createZonas(req, res) {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     try {
//         console.log("params : ");
//         var myzonas = req.body;
//         console.log("zonass ... " + myzonas);
//         return Zonas
//             .create({
//                 name: myzonas.name,
//                 description: myzonas.description,
//             }, {
//                 /* include: [{
//                 model: order_detail,
//                 as: 'orderdetail'
//                 }] */
//             })
//             .then((myzonas) => {
//                 res.status(201).send(myzonas);
//             })
//             .catch((error) => res.status(400).send(error));
//     } catch (error) {
//         console.log("Was an error");
//         controllerHelper.handleErrorResponse(MODULE_NAME, createZonas.name, error, res);
//     }
// }

// function updateZonas(req, res) {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     try {
//         var id = req.swagger.params.id.value;
//         console.log("params : " + id);
//         var myupdatezonas = req.body;
//         console.log("update zonass ... " + myupdatezonas.name + " " +
//             myupdatezonas.descripcion);
//         Zonas.findByPk(id)
//             .then(myzonas => {
//                 console.log("Result of findByPk: " + myzonas);
//                 if (!myzonas) {
//                     res.status(401).send(({}));
//                 }
//                 return myzonas
//                     .update({
//                         name: myupdatezonas.name,
//                         description: myupdatezonas.description
//                     })
//                     .then(() => res.status(200).send(myzonas))
//                     .catch(error => res.status(403).send(myzonas));
//             })
//             .catch(error => {
//                 console.log("There was an error: " + error);
//                 //resolve(error);
//             });
//     } catch (error) {
//         console.log("Was an error");
//         controllerHelper.handleErrorResponse(MODULE_NAME, updateZonas.name, error, res);
//     }

// }

// function deleteZonas(req, res) {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     console.log(req.swagger.params.id.value);
//     var id = req.swagger.params.id.value;
//     Zonas.findByPk(id)
//         .then(myzonas => {
//             console.log("Result of findByPk: " + myzonas);
//             if (!myzonas) {
//                 res.status(200).send({ "success": 0, "description": "not found !" });
//             } else {
//                 return myzonas
//                     .destroy()
//                     .then(() => res.status(200).send({ "success": 1, "message": "deleted!" }))
//                     .catch(error => res.status(403).send({ "success": 0, "message": "error !" }))
//             }
//         })
//         .catch(error => {
//             console.log("There was an error: " + error);
//         });
// }

module.exports = {
    getZonas,
    addZonas,
    getZonasById,
    // createZonas,
    // updateZonas,
    // deleteZonas,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}