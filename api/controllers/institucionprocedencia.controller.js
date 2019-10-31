'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var InstitucionProcedenciasService = require('../services/InstitucionProcedencias.service');

const { InstitucionProcedencias } = require('../models'); //Sequelize
////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[InstitucionProcedencias Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getInstitucionProcedencias(req, res) {

    try {
        console.log("InstitucionProcedencias...");
        console.log(InstitucionProcedencias);
        InstitucionProcedencias.findAll({
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

function addInstitucionProcedencias(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
        console.log("params : ");
        var myInstitucionProcedencias = req.body;
        console.log("InstitucionProcedenciass ... " + myInstitucionProcedencias);
        return InstitucionProcedencias
            .create({
                nombreInstProc: myInstitucionProcedencias.nombreInstProc
            }, {
                /* include: [{
                model: order_detail,
                as: 'orderdetail'
                }] */
            })
            .then((myInstitucionProcedencias) => {
                res.status(201).send(myInstitucionProcedencias);
            })
            .catch((error) => res.status(400).send(error));
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, addInstitucionProcedencias.nombreInstitucionProcedencias, error, res);
    }
}

function getInstitucionProcedenciasById(req, res) {

    try {
        console.log(req.swagger.params.id.value);
        var id = req.swagger.params.id.value;
        console.log("InstitucionProcedencias by id..." + id);
        //console.log(InstitucionProcedenciass);
        InstitucionProcedencias.findByPk(id)
            .then(myInstitucionProcedencias => {
                console.log(myInstitucionProcedencias);
                res.status(200).send(myInstitucionProcedencias);
            })
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getInstitucionProcedenciasById.name, error,
            res);
    }
}

// function createInstitucionProcedencias(req, res) {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     try {
//         console.log("params : ");
//         var myInstitucionProcedencias = req.body;
//         console.log("InstitucionProcedenciass ... " + myInstitucionProcedencias);
//         return InstitucionProcedencias
//             .create({
//                 name: myInstitucionProcedencias.name,
//                 description: myInstitucionProcedencias.description,
//             }, {
//                 /* include: [{
//                 model: order_detail,
//                 as: 'orderdetail'
//                 }] */
//             })
//             .then((myInstitucionProcedencias) => {
//                 res.status(201).send(myInstitucionProcedencias);
//             })
//             .catch((error) => res.status(400).send(error));
//     } catch (error) {
//         console.log("Was an error");
//         controllerHelper.handleErrorResponse(MODULE_NAME, createInstitucionProcedencias.name, error, res);
//     }
// }

function updateInstitucionProcedencias(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {
        var id = req.swagger.params.id.value;
        console.log("params : " + id);
        var myupdateInstitucionProcedencias = req.body;
        console.log("update InstitucionProcedencias ... " + myupdateInstitucionProcedencias.name + " " +
            myupdateInstitucionProcedencias.descripcion);
        InstitucionProcedencias.findByPk(id)
            .then(myInstitucionProcedencias => {
                console.log("Result of findByPk: " + myInstitucionProcedencias);
                if (!myInstitucionProcedencias) {
                    res.status(401).send(({}));
                }
                return myInstitucionProcedencias
                    .update({
                        nombreInstProc: myupdateInstitucionProcedencias.nombreInstProc
                    })
                    .then(() => res.status(200).send(myInstitucionProcedencias))
                    .catch(error => res.status(403).send(myInstitucionProcedencias));
            })
            .catch(error => {
                console.log("There was an error: " + error);
                //resolve(error);
            });
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateInstitucionProcedencias.nombreInstitucionProcedencias, error, res);
    }

}

// function deleteInstitucionProcedencias(req, res) {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     console.log(req.swagger.params.id.value);
//     var id = req.swagger.params.id.value;
//     InstitucionProcedencias.findByPk(id)
//         .then(myInstitucionProcedencias => {
//             console.log("Result of findByPk: " + myInstitucionProcedencias);
//             if (!myInstitucionProcedencias) {
//                 res.status(200).send({ "success": 0, "description": "not found !" });
//             } else {
//                 return myInstitucionProcedencias
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
    getInstitucionProcedencias,
    addInstitucionProcedencias,
    getInstitucionProcedenciasById,
    // createInstitucionProcedencias,
    updateInstitucionProcedencias,
    // deleteInstitucionProcedencias,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}