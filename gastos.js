const fs = require('fs');
const { calculo } = require('./montos');

const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
const gastos_arr = gastosJSON.gastos;

//peticion: POST gastos
const gastosRoommate = (g) => {
    gastos_arr.push(g);
    fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
}
//peticion: DELETE gastos
const deleteGasto = (id) => {
    const idGasto = gastos_arr.find(g => g.id == id);
    gastosJSON.gastos = gastos_arr.filter((g) => g.id !== id);
    fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
    calculo(idGasto.roommate, idGasto.monto, 3);
}

module.exports = { gastosRoommate, deleteGasto };