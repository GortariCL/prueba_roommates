const http = require('http');
const url = require('url');
const fs = require('fs');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { newRoommate, saveRoommate, recalculaGastos } = require('./roommate');
const { gastosRoommate, deleteGasto } = require('./gastos');
const { gastosRoommates } = require('./montos')

const server =
    http.createServer((req, res) => {
        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
        const gastos_arr = gastosJSON.gastos;
        //peticion: GET
        if (req.url === '/' && req.method == 'GET') {
            res.setHeader('Content-Type', 'text/html');
            res.end(fs.readFileSync('index.html', 'UTF8'));
        }
        //peticion: POST roommate
        if (req.url.startsWith('/roommate') && req.method == 'POST') {
            newRoommate().then(async (roommate) => {
                saveRoommate(roommate);
                recalculaGastos();
                res.end(JSON.stringify(roommate));
            }).catch(e => {
                res.statusCode = 500;
                res.end();
                console.log('Error en el registro de nuevo roommate!', e);
            });
        }
        //peticion: GET roommates
        if (req.url.startsWith('/roommates') && req.method == 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(fs.readFileSync('roommates.json', 'UTF8'));
        }
        //peticion: GET gastos
        if (req.url.startsWith('/gastos') && req.method == 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(fs.readFileSync('gastos.json', 'UTF8'));
        }
        // peticion: POST gasto
        if (req.url.startsWith('/gasto') && req.method == 'POST') {
            let body;
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });
            req.on('end', () => {
                let gastos = {
                    roommate: body.roommate,
                    descripcion: body.descripcion,
                    monto: body.monto,
                    fecha: moment().format('lll'),
                    id: uuidv4().slice(-6)
                }
                gastosRoommate(gastos);
                res.end();
            })
        } 
        // peticion: PUT gasto
        if (req.url.startsWith('/gasto') && req.method == 'PUT') {
            const { id } = url.parse(req.url, true).query;
            let body;
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            })
            req.on('end', () => {
                gastosJSON.gastos = gastos_arr.map((g) => {
                    if (g.id == id) {
                        const editGasto = {
                            roommate: body.roommate,
                            descripcion: body.descripcion,
                            monto: body.monto,
                            fecha: moment().format('lll'),
                            id: g.id,
                        }
                        return editGasto;
                    }
                    return g;
                });
                gastosRoommates(gastosJSON);
                fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
                res.end();
            })
        }
        // peticion: DELETE gasto
        if (req.url.startsWith('/gasto') && req.method == 'DELETE') {
            const { id } = url.parse(req.url, true).query;
            deleteGasto(id);
            res.end();
        }
    }).listen(8080, () => console.log('Servidor en puerto 3000'));

module.exports = server; 