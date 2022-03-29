const fs = require('fs');
const { gastosRoommates } = require('./montos');

const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
const gastos_arr = gastosJSON.gastos;

//peticion: POST gastos
const gastosRoommate = (g) => {
    gastos_arr.push(g);
    const gastos = gastosRoommates(gastosJSON);
    fs.writeFileSync('gastos.json', JSON.stringify(gastos));
}
//peticion: DELETE gastos
const deleteGasto = (id) => {
    gastosJSON.gastos = gastos_arr.filter((g) => g.id !== id);
    fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
    gastosRoommates(gastosJSON);
}

module.exports = { gastosRoommate, deleteGasto };